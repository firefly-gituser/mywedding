import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { RSVPData } from '../../firebase/rsvpService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLock, faUnlock, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: var(--body-font);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-2px);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  box-shadow: var(--box-shadow);
`;

const THead = styled.thead`
  background-color: var(--primary-color);
  color: white;
`;

const Th = styled.th<{ $sortable?: boolean }>`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  cursor: ${props => props.$sortable ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${props => props.$sortable ? 'var(--accent-color)' : 'inherit'};
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.02);
  }
  &:hover {
    background-color: rgba(193, 158, 103, 0.05);
  }
`;

const StatusBadge = styled.span<{ $isJoin: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => props.$isJoin ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)'};
  color: ${props => props.$isJoin ? '#27ae60' : '#c0392b'};
`;

const LoadingText = styled.p`
  text-align: center;
  font-style: italic;
  color: var(--text-color);
`;

const NoRecordsText = styled.p`
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
`;

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
`;

const LoginTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--border-radius);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(212, 176, 140, 0.2);
  }
`;

const LoginButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: var(--border-radius);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: var(--accent-color);
  }
`;

const ErrorMessage = styled.p`
  color: #c0392b;
  margin-top: 1rem;
`;

const FilterContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--border-radius);
  flex-grow: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--border-radius);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

interface RSVPRecord extends RSVPData {
  id: string;
  timestampDate?: Date;
}

type SortField = 'email' | 'isJoin' | 'timestamp' | 'isLatest';
type SortDirection = 'asc' | 'desc';

// Get admin password from environment variables
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123'; 

const RSVPList: React.FC = () => {
  const [records, setRecords] = useState<RSVPRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<RSVPRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchRecords = async () => {
        try {
          setLoading(true);
          
          // Create a query to fetch all RSVP records ordered by timestamp (descending)
          const rsvpCollectionRef = collection(db, 'rsvp');
          const q = query(rsvpCollectionRef, orderBy('timestamp', 'desc'));
          
          const querySnapshot = await getDocs(q);
          
          const fetchedRecords: RSVPRecord[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data() as RSVPData;
            
            // Convert Firestore timestamp to JS Date if it exists
            let timestampDate;
            if (data.timestamp) {
              // Firestore timestamps have toDate() method
              if (typeof data.timestamp.toDate === 'function') {
                timestampDate = data.timestamp.toDate();
              }
            }
            
            fetchedRecords.push({
              ...data,
              id: doc.id,
              timestampDate
            });
          });
          
          setRecords(fetchedRecords);
          setFilteredRecords(fetchedRecords);
        } catch (err) {
          console.error('Error fetching RSVP records:', err);
          setError('Failed to load RSVP records. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchRecords();
    }
  }, [isAuthenticated]);

  // Handle filtering and sorting
  useEffect(() => {
    let result = [...records];
    
    // Apply filters
    if (filterText) {
      result = result.filter(record => 
        record.email.toLowerCase().includes(filterText.toLowerCase()) || 
        record.message.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      if (filterStatus === 'attending') {
        result = result.filter(record => record.isJoin);
      } else if (filterStatus === 'notAttending') {
        result = result.filter(record => !record.isJoin);
      } else if (filterStatus === 'latest') {
        result = result.filter(record => record.isLatest);
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'isJoin':
          comparison = a.isJoin === b.isJoin ? 0 : a.isJoin ? 1 : -1;
          break;
        case 'timestamp':
          if (a.timestampDate && b.timestampDate) {
            comparison = a.timestampDate.getTime() - b.timestampDate.getTime();
          }
          break;
        case 'isLatest':
          comparison = a.isLatest === b.isLatest ? 0 : a.isLatest ? 1 : -1;
          break;
        default:
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredRecords(result);
  }, [records, filterText, filterStatus, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set to default desc
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <FontAwesomeIcon icon={faSort} size="sm" />;
    }
    return sortDirection === 'asc' ? 
      <FontAwesomeIcon icon={faSortUp} size="sm" /> : 
      <FontAwesomeIcon icon={faSortDown} size="sm" />;
  };

  // Format the date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <LoginTitle>
          <FontAwesomeIcon icon={faLock} /> Xác thực quản trị
        </LoginTitle>
        <LoginForm onSubmit={handleLogin}>
          <PasswordInput 
            type="password" 
            placeholder="Nhập mật khẩu quản trị" 
            value={password}
            onChange={handlePasswordChange}
            required 
          />
          <LoginButton type="submit">
            <FontAwesomeIcon icon={faUnlock} /> Đăng nhập
          </LoginButton>
        </LoginForm>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <Button to="/" style={{ marginTop: '1.5rem', width: '100%' }}>
          <FontAwesomeIcon icon={faHome} /> Quay lại trang chủ
        </Button>
      </LoginContainer>
    );
  }

  if (loading) {
    return (
      <ListContainer>
        <Header>
          <Title>Danh Sách Xác Nhận Tham Dự</Title>
          <Button to="/">
            <FontAwesomeIcon icon={faHome} /> Quay lại trang chủ
          </Button>
        </Header>
        <LoadingText>Đang tải dữ liệu...</LoadingText>
      </ListContainer>
    );
  }

  if (error) {
    return (
      <ListContainer>
        <Header>
          <Title>Danh Sách Xác Nhận Tham Dự</Title>
          <Button to="/">
            <FontAwesomeIcon icon={faHome} /> Quay lại trang chủ
          </Button>
        </Header>
        <NoRecordsText>{error}</NoRecordsText>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <Header>
        <Title>Danh Sách Xác Nhận Tham Dự</Title>
        <Button to="/">
          <FontAwesomeIcon icon={faHome} /> Quay lại trang chủ
        </Button>
      </Header>
      
      <FilterContainer>
        <FilterInput 
          type="text" 
          placeholder="Tìm kiếm theo email hoặc lời nhắn..." 
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <FilterSelect 
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="attending">Tham dự</option>
          <option value="notAttending">Không tham dự</option>
          <option value="latest">Mới nhất</option>
        </FilterSelect>
      </FilterContainer>
      
      {filteredRecords.length === 0 ? (
        <NoRecordsText>
          {filterText || filterStatus !== 'all' ? 
            'Không tìm thấy kết quả phù hợp với bộ lọc.' : 
            'Chưa có xác nhận tham dự nào.'}
        </NoRecordsText>
      ) : (
        <Table>
          <THead>
            <tr>
              <Th $sortable onClick={() => handleSort('email')}>
                Email {renderSortIcon('email')}
              </Th>
              <Th $sortable onClick={() => handleSort('isJoin')}>
                Tham Dự {renderSortIcon('isJoin')}
              </Th>
              <Th>Lời Nhắn</Th>
              <Th $sortable onClick={() => handleSort('timestamp')}>
                Thời Gian {renderSortIcon('timestamp')}
              </Th>
              <Th>Mã Xác Nhận</Th>
              <Th $sortable onClick={() => handleSort('isLatest')}>
                Trạng Thái {renderSortIcon('isLatest')}
              </Th>
            </tr>
          </THead>
          <tbody>
            {filteredRecords.map((record) => (
              <Tr key={record.id}>
                <Td>{record.email}</Td>
                <Td>
                  <StatusBadge $isJoin={record.isJoin}>
                    {record.isJoin ? 'Tham Dự' : 'Không Tham Dự'}
                  </StatusBadge>
                </Td>
                <Td>{record.message || '(Không có lời nhắn)'}</Td>
                <Td>{formatDate(record.timestampDate)}</Td>
                <Td>{record.verifiedCode}</Td>
                <Td>{record.isLatest ? 'Mới Nhất' : 'Cũ'}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </ListContainer>
  );
};

export default RSVPList;