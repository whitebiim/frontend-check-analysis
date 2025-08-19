import React, { useState } from 'react';
import './validChecksTable.css';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import validChecksData from '../../data/receipts.json';

const StyledTableWrapper = styled(Box)({
  maxHeight: 850,
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StatusBadge = styled('span')<{ valid: boolean }>(({ valid }) => ({
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  backgroundColor: valid ? '#ECFDF5' : '#FEF2F2',
  color: valid ? '#10B981' : '#EF4444',
}));

export const InValidChecksTable = () => {
  const [selectedCheck, setSelectedCheck] = useState<any>(null);

 
  const validChecks = validChecksData.filter(check => 
    check.Items.some(item => item.InvoiceType === null)
  );

  const handleShowDetails = (check: any) => {
    setSelectedCheck(check);
  };

  return (
    <div className="invalid-content-area">
      <div className="invalid-row">
        <div className="invalid-list-block">
          <h3>Список невалидных чеков</h3>
          <div className="invalid-list-container">
            <StyledTableWrapper>
              <TableContainer component={Paper} sx={{ maxHeight: 850, width: 600 }}>
                <Table stickyHeader aria-label="invalid checks table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID чека</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell>Дата</TableCell>
                      <TableCell>Сумма, ₽</TableCell>
                      <TableCell>Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {validChecks.map((check) => (
                      <StyledTableRow key={check.Id}>
                        <TableCell>{check.Id}</TableCell>
                        <TableCell>
                          <StatusBadge valid={false}>
                            Невалиден
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          {new Date(check.CreatedAt).toLocaleDateString('ru-RU')}
                        </TableCell>
                        <TableCell>
                          {check.TotalSum.toLocaleString('ru-RU')} ₽
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleShowDetails(check)}
                            sx={{
                              fontSize: '0.75rem',
                              padding: '4px 8px',
                              minWidth: 'auto'
                            }}
                          >
                            Подробнее
                          </Button>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledTableWrapper>
          </div>
        </div>

        <div className="invalid-details-block">
          <h3>Подробнее о чеке</h3>
          <div className="invalid-details-container">
            {selectedCheck ? (
              <div className="invalid-details-card">
                <div className="invalid-detail-section">
                  <h4>Информация о чеке</h4>
                  <div className="invalid-detail-row">
                    <span className="invalid-detail-label">ID чека:</span>
                    <span className="invalid-detail-value">{selectedCheck.Id}</span>
                  </div>
                  <div className="invalid-detail-row">
                    <span className="invalid-detail-label">Дата:</span>
                    <span className="invalid-detail-value">
                      {new Date(selectedCheck.CreatedAt).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <div className="invalid-detail-row">
                    <span className="invalid-detail-label">Общая сумма:</span>
                    <span className="invalid-detail-value">
                      {selectedCheck.TotalSum.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <div className="invalid-detail-section">
                  <h4>Товары в чеке ({selectedCheck.Items.length})</h4>
                  {selectedCheck.Items.map((item: any, index: number) => (
                    <div key={index} className="invalid-product-item">
                      <div className="invalid-detail-row">
                        <span className="invalid-detail-label">Товар:</span>
                        <span className="invalid-detail-value">{item.Name}</span>
                      </div>
                      <div className="invalid-detail-row">
                        <span className="invalid-detail-label">Кол-во, шт:</span>
                        <span className="invalid-detail-value">{item.Quantity}</span>
                      </div>
                      <div className="invalid-detail-row">
                        <span className="invalid-detail-label">Цена:</span>
                        <span className="invalid-detail-value">
                          {item.Price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="invalid-detail-row">
                        <span className="invalid-detail-label">Сумма:</span>
                        <span className="invalid-detail-value">
                          {item.Sum.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      {index < selectedCheck.Items.length - 1 && (
                        <hr className="invalid-divider" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="invalid-placeholder">
                Выберите чек для просмотра деталей
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};