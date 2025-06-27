import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faExclamationTriangle, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { RSVPFormData } from '../../types/types';
import { submitRSVP, checkExistingEmail, verifyCode, updateRSVP } from '../../firebase/rsvpService';

const RSVPSection = styled.section`
  background-color: var(--secondary-color);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 2rem auto 0;
  text-align: left;
  animation: fadeIn 1s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: var(--border-width) solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  background-color: var(--light-color);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(212, 176, 140, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: var(--border-width) solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  background-color: var(--light-color);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(212, 176, 140, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: var(--border-width) solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  background-color: var(--light-color);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(212, 176, 140, 0.2);
  }
`;

const Button = styled.button`
  display: inline-block;
  background-color: var(--primary-color);
  color: var(--light-color);
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
  position: relative;
  overflow: hidden;
  border: var(--border-width) solid transparent;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    transform: scale(0);
    transition: transform 0.5s ease;
  }

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-5px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
    border-color: var(--accent-color);
  }

  &:hover::before {
    transform: scale(2);
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
  
  .success-icon {
    font-size: 3rem;
    color: var(--accent-color);
    margin-bottom: 1rem;
    animation: pulse 2s infinite;
  }
`;

const VerificationCode = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: var(--light-color);
  border-radius: var(--border-radius);
  border: 2px dashed var(--primary-color);
  
  .code {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.3rem;
    color: var(--primary-color);
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: rgba(212, 176, 140, 0.1);
    border-radius: var(--border-radius);
  }
  
  p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const VerificationForm = styled.div`
  max-width: 600px;
  margin: 2rem auto 0;
  text-align: left;
  animation: fadeIn 1s ease;
  padding: 1.5rem;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  background-color: rgba(255, 255, 255, 0.8);
`;

const VerificationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .icon {
    font-size: 1.5rem;
    color: var(--accent-color);
    margin-right: 1rem;
  }
`;

const CodeInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: var(--border-width) solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  background-color: var(--light-color);
  letter-spacing: 0.3rem;
  text-align: center;
  margin-bottom: 1rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(212, 176, 140, 0.2);
  }
`;

const MessageBox = styled.div<{ type: 'error' | 'success' }>`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  
  background-color: ${props => props.type === 'error' ? 'rgba(220, 53, 69, 0.1)' : 'rgba(40, 167, 69, 0.1)'};
  color: ${props => props.type === 'error' ? '#dc3545' : '#28a745'};
  
  .icon {
    margin-right: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: var(--light-color);
  color: var(--text-color);
  border: var(--border-width) solid var(--border-color);
  
  &:hover {
    background-color: var(--secondary-color);
    border-color: var(--primary-color);
    color: var(--text-color);
  }
`;

const MapSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const MapContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto 0;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease;
  
  iframe {
    width: 100%;
    height: 400px;
    border: none;
  }
  
  @media (max-width: 768px) {
    iframe {
      height: 300px;
    }
  }
`;

const MapTitle = styled.h3`
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 400;
`;

const LocationInfo = styled.div`
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(212, 176, 140, 0.1);
  border-radius: var(--border-radius);
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: var(--primary-color);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.9rem;
  }
`;

const CoordinateLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  background-color: rgba(212, 176, 140, 0.1);
  border: 2px solid transparent;
  
  &:hover {
    color: var(--accent-color);
    background-color: rgba(212, 176, 140, 0.2);
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const RSVP: React.FC = () => {
  const [titleRef, titleInView] = useScrollAnimation({
    delay: 150,
    distance: '30px',
    origin: 'bottom'
  });

  const [textRef, textInView] = useScrollAnimation({
    delay: 250,
    distance: '30px',
    origin: 'bottom'
  });

  const [formRef, formInView] = useScrollAnimation({
    delay: 350,
    distance: '30px',
    origin: 'bottom'
  });

  const [formData, setFormData] = useState<RSVPFormData>({
    email: '',
    attending: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [messagePlaceholder, setMessagePlaceholder] = useState('');
  const [submittedAttending, setSubmittedAttending] = useState('');
  const [verificationCode, setVerificationCode] = useState<string>('');

  // Trạng thái mới để kiểm tra email đã tồn tại
  const [isEmailExisting, setIsEmailExisting] = useState(false);
  const [verificationInput, setVerificationInput] = useState('');
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState('');

  // State để kiểm soát xem người dùng đang cập nhật hay tạo mới
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [updatedVerificationCode, setUpdatedVerificationCode] = useState<string>('');

  // Update message placeholder based on attending selection
  useEffect(() => {
    if (formData.attending === 'yes') {
      setMessagePlaceholder('Bạn có yêu cầu gì cho chuyến đi không?');
    } else if (formData.attending === 'no') {
      setMessagePlaceholder('Gửi lời chúc đến cô dâu và chú rể...');
    } else {
      setMessagePlaceholder('');
    }
  }, [formData.attending]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Xử lý kiểm tra email đã tồn tại
  const checkEmail = async (email: string) => {
    try {
      const result = await checkExistingEmail(email);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Trở về form nhập email
  const handleGoBack = () => {
    setIsEmailExisting(false);
    setVerificationInput('');
    setVerificationError('');
    setVerificationSuccess('');
  };

  // Xử lý thay đổi input mã xác thực
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Chuyển đổi thành chữ in hoa và loại bỏ khoảng trắng
    const value = e.target.value.toUpperCase().replace(/\s/g, '');
    setVerificationInput(value);
  };

  // Xử lý xác thực mã
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyingCode(true);
    setVerificationError('');
    setVerificationSuccess('');

    try {
      if (verificationInput.length !== 5) {
        setVerificationError('Mã xác thực phải có 5 ký tự');
        setVerifyingCode(false);
        return;
      }

      const isValid = await verifyCode(formData.email, verificationInput);

      if (isValid) {
        setVerificationSuccess('Mã xác thực hợp lệ. Đang cập nhật thông tin RSVP...');
        // Đánh dấu là đang cập nhật thông tin
        setIsUpdating(true);

        // Tự động gửi form sau khi xác thực thành công
        try {
          const isJoin = formData.attending === 'yes';

          // Cập nhật thông tin vào Firestore và nhận mã xác thực mới
          const newVerificationCode = await updateRSVP(formData.email, {
            email: formData.email,
            isJoin: isJoin,
            message: formData.message
          });

          // Cập nhật state để hiển thị thông báo thành công
          setSubmittedAttending(formData.attending);
          setIsUpdateSuccessful(true);
          setUpdatedVerificationCode(newVerificationCode);
          setIsSubmitted(true);
          setIsEmailExisting(false);

          // Reset form
          setFormData({
            email: '',
            attending: '',
            message: ''
          });
        } catch (error) {
          setVerificationError('Đã xảy ra lỗi khi gửi form. Vui lòng thử lại sau.');
          setIsUpdating(false);
        }
      } else {
        setVerificationError('Mã xác thực không đúng. Vui lòng thử lại.');
      }
    } catch (error) {
      setVerificationError('Đã xảy ra lỗi khi xác thực. Vui lòng thử lại sau.');
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Simple validation
    if (!formData.email || !formData.attending) {
      setFormError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);

    try {
      // Nếu không phải đang cập nhật, kiểm tra xem email đã tồn tại chưa
      if (!isUpdating) {
        const emailResult = await checkEmail(formData.email);

        // Nếu email đã tồn tại, yêu cầu mã xác thực
        if (emailResult.exists) {
          setIsEmailExisting(true);
          setIsSubmitting(false);
          return;
        }

        // Store the attending value before resetting the form
        setSubmittedAttending(formData.attending);

        // Convert attending value to boolean for Firestore
        const isJoin = formData.attending === 'yes';

        // Submit to Firestore and get the verification code
        const code = await submitRSVP({
          email: formData.email,
          isJoin: isJoin,
          message: formData.message
        });

        // Store the verification code
        setVerificationCode(code);
        setIsSubmitted(true);
      } else {
        // Nếu đang cập nhật, sử dụng hàm updateRSVP
        // Convert attending value to boolean for Firestore
        const isJoin = formData.attending === 'yes';

        // Cập nhật thông tin vào Firestore và nhận mã xác thực mới
        const newVerificationCode = await updateRSVP(formData.email, {
          email: formData.email,
          isJoin: isJoin,
          message: formData.message
        });

        setSubmittedAttending(formData.attending);
        setIsUpdateSuccessful(true);
        setUpdatedVerificationCode(newVerificationCode);
        setIsSubmitted(true);
      }

      // Reset form
      setFormData({
        email: '',
        attending: '',
        message: ''
      });
    } catch (error) {
      setFormError('Đã xảy ra lỗi khi gửi form. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RSVPSection>
      <Container>
        {!isSubmitted && (
          <>
            <h2 ref={titleRef}>{isUpdating ? 'Cập Nhật Thông Tin Tham Dự' : 'Xác Nhận Tham Dự'}</h2>
            <p ref={textRef}>
              Chúng tôi rất mong được đón tiếp quý vị trong ngày trọng đại này. Để chuẩn bị chu đáo cho chuyến đi và phương tiện di chuyển,
              vui lòng xác nhận tham dự bằng cách điền vào form bên dưới đến hết ngày <strong>05/7/2025</strong>. Nếu bạn đã đăng ký trước đó, vui lòng nhập mã xác thực để cập nhật thông tin.
            </p>
          </>
        )}

        <div ref={formRef}>
          {isEmailExisting ? (
            <VerificationForm>
              <VerificationHeader>
                <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
                <div>
                  <h3>Email đã được đăng ký</h3>
                  <p>Email {formData.email} đã được đăng ký trước đó. Vui lòng nhập mã xác thực để cập nhật thông tin.
                    <b />Trường hợp bạn đã quên mã xác thực, liên hệ cô dâu hoặc chú rể nhen...</p>
                </div>
              </VerificationHeader>

              {verificationError && (
                <MessageBox type="error">
                  <FontAwesomeIcon icon={faTimesCircle} className="icon" />
                  {verificationError}
                </MessageBox>
              )}

              {verificationSuccess && (
                <MessageBox type="success">
                  <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                  {verificationSuccess}
                </MessageBox>
              )}

              <form onSubmit={handleVerifyCode}>
                <FormGroup>
                  <label htmlFor="verificationCode">Mã xác thực (5 ký tự):</label>
                  <CodeInput
                    type="text"
                    id="verificationCode"
                    value={verificationInput}
                    onChange={handleVerificationCodeChange}
                    placeholder="XXXXX"
                    maxLength={5}
                    required
                  />
                </FormGroup>

                <ButtonGroup>
                  <SecondaryButton type="button" onClick={handleGoBack}>
                    Quay Lại
                  </SecondaryButton>

                  <Button type="submit" disabled={verifyingCode || verificationSuccess !== ''}>
                    {verifyingCode ? 'Đang xác thực...' : 'Xác Thực'}
                  </Button>
                </ButtonGroup>
              </form>
            </VerificationForm>
          ) : !isSubmitted ? (
            <Form onSubmit={handleSubmit}>
              {formError && <p style={{ color: 'red' }}>{formError}</p>}

              <FormGroup>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Của Bạn"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isUpdating} // Disable email field khi đang cập nhật
                />
              </FormGroup>

              <FormGroup>
                <Select
                  id="attending"
                  name="attending"
                  value={formData.attending}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Bạn sẽ tham dự?</option>
                  <option value="yes">Vâng, dĩ nhiên rồi</option>
                  <option value="no">Không, tiếc là tôi không thể tham dự</option>
                </Select>
              </FormGroup>

              {formData.attending && (
                <FormGroup>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={messagePlaceholder}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </FormGroup>
              )}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : isUpdating ? 'Cập Nhật Xác Nhận' : 'Gửi Xác Nhận'}
              </Button>
            </Form>
          ) : (
            <SuccessMessage>
              <div className="success-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h3>Cảm Ơn!</h3>
              {isUpdateSuccessful ? (
                <>
                  <p>
                    {submittedAttending === 'yes'
                      ? 'Cập nhật tham dự của bạn đã được ghi nhận. Chúng tôi rất háo hức được chào đón bạn!'
                      : 'Lời chúc đã được ghi nhận. Cảm ơn tình yêu thương đến từ bạn <3'}
                  </p>

                  <VerificationCode>
                    <h4>Mã Xác Nhận Mới Của Bạn</h4>
                    <div className="code">{updatedVerificationCode}</div>
                    <p>Đây là mã xác thực mới của bạn. Vui lòng lưu lại để sử dụng cho lần cập nhật tiếp theo.</p>
                  </VerificationCode>
                </>
              ) : (
                <>
                  <p>
                    {submittedAttending === 'yes'
                      ? 'Xác nhận tham dự của bạn đã được ghi nhận. Chúng tôi rất háo hức được chào đón bạn!'
                      : 'Lời chúc đã được ghi nhận. Cảm ơn tình yêu thương đến từ bạn <3'}
                  </p>

                  <VerificationCode>
                    <h4>Mã Xác Nhận Của Bạn</h4>
                    <div className="code">{verificationCode}</div>
                    <p>Vui lòng lưu mã này để sử dụng trong trường hợp bạn cần cập nhật thông tin RSVP.</p>
                  </VerificationCode>
                </>
              )}
            </SuccessMessage>
          )}
        </div>

        <MapSection>
          <MapTitle>Địa Điểm Tổ Chức</MapTitle>
          <CoordinateLink
            href="https://www.google.com/maps?q=9.9844,105.6284"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mở trên Google Maps
          </CoordinateLink>
          <MapContainer>
            <iframe
              src="https://www.google.com/maps?q=9.9844,105.6284&hl=en&z=16&output=embed"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Location"
            />
          </MapContainer>
          <LocationInfo>
          </LocationInfo>
        </MapSection>
      </Container>
    </RSVPSection>
  );
};

export default RSVP;