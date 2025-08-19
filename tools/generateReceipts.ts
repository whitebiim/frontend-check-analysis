import { faker } from '@faker-js/faker/locale/ru';
import { writeFileSync } from 'fs';

interface Item {
  Name: string;
  Price: number;
  Quantity: number;
  Sum: number;
  InvoiceType: number | null;
  InvoiceSum: number;
  ProductType: number;
  PaymentType: number;
  "Organization form": string;
}

interface Receipt {
  Items: Item[];
  Id: number;
  User: number;
  CreatedAt: string;
  TotalSum: number;
}

function generateReceipt(isService: boolean, isValid: boolean = true): Receipt {
  const itemCount = faker.number.int({ min: 1, max: 5 });
  const items: Item[] = [];
  let totalSum = 0;

  const invoiceType = isValid 
    ? (isService ? 2 : 1) 
    : null;

  for (let i = 0; i < itemCount; i++) {
    const price = faker.number.float({ 
      min: 10, 
      max: 1000, 
      fractionDigits: 2 
    });
    const quantity = faker.number.int({ min: 1, max: 10 });
    const sum = parseFloat((price * quantity).toFixed(2));
    
    const item: Item = {
      Name: isService 
        ? faker.commerce.productName() + " (услуга)"
        : faker.commerce.productName(),
      Price: price,
      Quantity: quantity,
      Sum: sum,
      InvoiceType: invoiceType,
      InvoiceSum: sum,
      ProductType: faker.number.int({ min: 1, max: 10 }),
      PaymentType: faker.number.int({ min: 1, max: 3 }),
      "Organization form": faker.company.name()
    };

    items.push(item);
    totalSum += sum;
  }

  return {
    Items: items,
    Id: faker.number.int({ min: 10000, max: 99999 }),
    User: faker.number.int({ min: 1000, max: 9999 }),
    CreatedAt: faker.date.recent({ days: 30 }).toISOString(),
    TotalSum: parseFloat(totalSum.toFixed(2))
  };
}

function generateReceipts(count: number) {
  const receipts: Receipt[] = [];
  
  for (let i = 0; i < count; i++) {
    const isService = faker.datatype.boolean();
    const isValid = faker.datatype.boolean();
    
    receipts.push(generateReceipt(isService, isValid));
    
    // Добавляем гарантированно валидные чеки с товарами и услугами
    if (i === 0) {
      receipts.push(generateReceipt(false, true)); // товары
      receipts.push(generateReceipt(true, true)); // услуги
    }
    
    // Добавляем гарантированно невалидный чек
    if (i === 1) {
      receipts.push(generateReceipt(faker.datatype.boolean(), false));
    }
  }

  return receipts;
}

const receipts = generateReceipts(100);
writeFileSync('./src/data/receipts.json', JSON.stringify(receipts, null, 2), 'utf8');
console.log('Сгенерировано 100 чеков (включая гарантированные примеры) и сохранено в receipts.json');

// node tools/generateReceipts.js