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

export const ValidChecksTable = () => {
  const [selectedCheck, setSelectedCheck] = useState<any>(null);

  // Фильтруем только валидные чеки (InvoiceType 1 или 2)
  const validChecks = validChecksData.filter(check => 
    check.Items.some(item => item.InvoiceType === 1 || item.InvoiceType === 2)
  );

  const handleShowDetails = (check: any) => {
    setSelectedCheck(check);
  };

  return (
    <div>
      <div className="valid-row">
        <div className="valid-list-block">
          <h3>Список валидных чеков</h3>
          <div className="valid-list-container">
            <StyledTableWrapper sx={{ width: '100%' }}>
              <TableContainer component={Paper} sx={{ maxHeight: 850 }}>
                <Table stickyHeader aria-label="valid checks table">
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
                          <StatusBadge valid={true}>
                            Валиден
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

        <div className="valid-details-block">
          <h3>Подробнее о чеке</h3>
          <div className="valid-details-container">
            {selectedCheck ? (
              <div className="valid-details-card">
                <div className="valid-detail-section">
                  <h4>Информация о чеке</h4>
                  <div className="valid-detail-row">
                    <span className="valid-detail-label">ID чека: </span>
                    <span className="valid-detail-value">{selectedCheck.Id}</span>
                  </div>
                  <div className="valid-detail-row">
                    <span className="valid-detail-label">Дата: </span>
                    <span className="valid-detail-value">
                      {new Date(selectedCheck.CreatedAt).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <div className="valid-detail-row">
                    <span className="valid-detail-label">Общая сумма: </span>
                    <span className="valid-detail-value">
                      {selectedCheck.TotalSum.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <div className="valid-detail-section">
                  <h4>Товары в чеке ({selectedCheck.Items.length})</h4>
                  {selectedCheck.Items.map((item: any, index: number) => (
                    <div key={index} className="valid-product-item">
                      <div className="valid-detail-row">
                        <span className="valid-detail-label">Товар: </span>
                        <span className="valid-detail-value">{item.Name}</span>
                      </div>
                      <div className="valid-detail-row">
                        <span className="valid-detail-label">Кол-во, шт: </span>
                        <span className="valid-detail-value">{item.Quantity}</span>
                      </div>
                      <div className="valid-detail-row">
                        <span className="valid-detail-label">Цена: </span>
                        <span className="valid-detail-value">
                          {item.Price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="valid-detail-row">
                        <span className="valid-detail-label">Сумма: </span>
                        <span className="valid-detail-value">
                          {item.Sum.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      {index < selectedCheck.Items.length - 1 && (
                        <hr className="valid-divider" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="valid-placeholder">
                Выберите чек для просмотра деталей
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};