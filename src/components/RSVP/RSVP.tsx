import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { RSVPFormData } from '../../types/types';

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

const RSVP: React.FC = () => {
  const [titleRef, titleInView] = useScrollAnimation({
    delay: 200,
    distance: '30px',
    origin: 'bottom'
  });
  
  const [textRef, textInView] = useScrollAnimation({
    delay: 300,
    distance: '30px',
    origin: 'bottom'
  });
  
  const [formRef, formInView] = useScrollAnimation({
    delay: 400,
    distance: '30px',
    origin: 'bottom'
  });

  const [formData, setFormData] = useState<RSVPFormData>({
    email: '',
    attending: '',
    guests: 0,
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'guests' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Simple validation
    if (!formData.email || !formData.attending) {
      setFormError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        email: '',
        attending: '',
        guests: 0,
        message: ''
      });
    }, 1500);
  };

  return (
    <RSVPSection>
      <Container>
        <h2 ref={titleRef}>Xác Nhận Tham Dự</h2>
        <p ref={textRef}>
          Chúng tôi rất mong được đón tiếp quý vị trong ngày trọng đại. 
          Vui lòng xác nhận tham dự trước ngày 17 tháng 6 năm 2025.
        </p>
        
        <div ref={formRef}>
          {!isSubmitted ? (
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
                  <option value="yes">Vui Lòng Xác Nhận Tham Dự</option>
                  <option value="no">Tiếc Rằng Không Thể Tham Dự</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Input 
                  type="number" 
                  id="guests" 
                  name="guests" 
                  min="0" 
                  max="5" 
                  placeholder="Số Lượng Khách Mời" 
                  value={formData.guests || ''}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Lời Nhắn Hoặc Yêu Cầu Đặc Biệt"
                  value={formData.message}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Gửi Xác Nhận'}
              </Button>
            </Form>
          ) : (
            <SuccessMessage>
              <div className="success-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h3>Cảm Ơn!</h3>
              <p>Xác nhận tham dự của bạn đã được ghi nhận. Chúng tôi rất háo hức được chào đón bạn!</p>
            </SuccessMessage>
          )}
        </div>
      </Container>
    </RSVPSection>
  );
};

export default RSVP;