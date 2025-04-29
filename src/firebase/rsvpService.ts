import { collection, addDoc, serverTimestamp, query, where, getDocs, DocumentData, updateDoc, doc, orderBy, limit } from 'firebase/firestore';
import { db } from './config';

// Define the RSVP data structure that users submit
interface RSVPSubmission {
  email: string;
  isJoin: boolean;
  message?: string;
}

// Define the complete RSVP data to be stored in Firestore
export interface RSVPData {
  email: string;
  isJoin: boolean;
  message: string;
  isLatest: boolean;
  isBlocked: boolean;
  timestamp: any; // Using 'any' for serverTimestamp()
  verifiedCode: string; // 5-character verification code
}

/**
 * Generates a random 5-character verification code
 * consisting of uppercase letters and numbers
 * @returns A 5-character string
 */
const generateVerificationCode = (): string => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding similar looking characters like I, 1, O, 0
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Kiểm tra xem email đã tồn tại trong dữ liệu RSVP chưa
 * Trả về record với timestamp mới nhất
 * @param email Email cần kiểm tra
 * @returns Trả về thông tin RSVP nếu email đã tồn tại, null nếu chưa tồn tại
 */
export const checkExistingEmail = async (email: string): Promise<{ exists: boolean, data?: DocumentData }> => {
  try {
    const rsvpCollectionRef = collection(db, 'rsvp');
    // Chỉ tìm record với email và isLatest=true, không sắp xếp theo timestamp trong query
    const q = query(
      rsvpCollectionRef,
      where("email", "==", email),
      where("isLatest", "==", true)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { exists: false };
    } else {
      // Lấy dữ liệu của document đầu tiên vì với isLatest=true, chỉ có 1 document
      // Do chúng ta đã đảm bảo chỉ có một record với isLatest=true cho mỗi email
      return { 
        exists: true, 
        data: querySnapshot.docs[0].data()
      };
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Xác thực mã code cho một email đã đăng ký
 * @param email Email đăng ký
 * @param code Mã xác thực người dùng nhập vào
 * @returns true nếu mã hợp lệ, false nếu không hợp lệ
 */
export const verifyCode = async (email: string, code: string): Promise<boolean> => {
  try {
    const result = await checkExistingEmail(email);
    
    if (result.exists && result.data) {
      return result.data.verifiedCode === code;
    }
    
    return false;
  } catch (error) {
    throw error;
  }
};

/**
 * Đặt tất cả các record cũ của email thành isLatest = false
 * @param email Email cần cập nhật
 */
const updatePreviousRecords = async (email: string) => {
  try {
    const rsvpCollectionRef = collection(db, 'rsvp');
    const q = query(rsvpCollectionRef, where("email", "==", email), where("isLatest", "==", true));
    
    const querySnapshot = await getDocs(q);
    
    const updatePromises = querySnapshot.docs.map(doc => {
      return updateDoc(doc.ref, { isLatest: false });
    });
    
    await Promise.all(updatePromises);
    
  } catch (error) {
    throw error;
  }
};

/**
 * Submits an RSVP entry to Firebase Firestore
 * @param rsvpData The RSVP form data
 * @returns A promise that resolves with the verification code when the data is submitted
 */
export const submitRSVP = async (rsvpData: RSVPSubmission): Promise<string> => {
  try {
    // Đặt tất cả các record cũ thành isLatest = false
    await updatePreviousRecords(rsvpData.email);
    
    // Generate a verification code
    const verifiedCode = generateVerificationCode();
    
    // Set up the data to be submitted to Firestore
    const submissionData: RSVPData = {
      email: rsvpData.email,
      isJoin: rsvpData.isJoin,
      message: rsvpData.message || '',
      isLatest: true, // Mark this submission as the latest from this email
      isBlocked: false, // Default value for new submissions
      timestamp: serverTimestamp(), // Add a server timestamp
      verifiedCode: verifiedCode // Add the verification code
    };

    // Get a reference to the 'rsvp' collection in Firestore
    const rsvpCollectionRef = collection(db, 'rsvp');
    
    // Add the new RSVP document to the collection
    await addDoc(rsvpCollectionRef, submissionData);
    // Return the verification code so it can be shown to the user
    return verifiedCode;
  } catch (error) {
    throw error;
  }
};

/**
 * Cập nhật thông tin RSVP bằng cách tạo record mới với mã xác thực mới
 * @param email Email của người dùng
 * @param rsvpData Dữ liệu RSVP mới
 * @returns Trả về mã xác thực mới
 */
export const updateRSVP = async (email: string, rsvpData: RSVPSubmission): Promise<string> => {
  try {
    // Sử dụng hàm submitRSVP để tạo record mới thay vì cập nhật record cũ
    const newVerificationCode = await submitRSVP(rsvpData);
    
    return newVerificationCode;
  } catch (error) {
    throw error;
  }
};