// // tools/generateReceipts.ts
// import { faker } from '@faker-js/faker/locale/ru';
// import { writeFileSync } from 'fs';

// type ReceiptItem = {
//   Name: string;
//   Price: number;
//   Quantity: number;
//   Sum: number;
//   InvoiceType: number | null;
//   InvoiceSum: number | null;
//   ProductType: number;
//   PaymentType: number;
//   "Organization form": string;
// };

// type Receipt = {
//   Items: ReceiptItem[];
//   Id: number;
//   User: number;
//   CreatedAt: string;
// };

// const PRODUCT_CATEGORIES: Record<number, string[]> = {
//   1: ['Молоко 1л', 'Кефир 1л', 'Сметана 20%', 'Йогурт фруктовый'],
//   2: ['Хлеб белый', 'Хлеб ржаной', 'Батон нарезной', 'Булочка сдобная'],
//   3: ['Яблоки', 'Бананы', 'Апельсины', 'Груши'],
//   4: ['Чай черный', 'Чай зеленый', 'Кофе молотый', 'Какао'],
//   5: ['Шоколад молочный', 'Шоколад горький', 'Конфеты шоколадные'],
//   12: ['Учебник математики', 'Учебник истории', 'Книга по программированию'],
//   14: ['Консультация юриста', 'Составление договора', 'Представительство в суде'],
//   15: ['Ремонт обуви', 'Чистка обуви', 'Замена каблука'],
//   16: ['Стрижка', 'Окрашивание', 'Маникюр', 'Педикюр'],
//   17: ['Установка Windows', 'Чистка компьютера', 'Замена жесткого диска'],
//   26: ['Пиво "Жигулевское"', 'Пиво "Балтика"', 'Пиво "Клинское"']
// };

// const ORGANIZATION_TYPES: Record<number, string> = {
//   1: 'ООО "%s"',
//   2: 'ИП %s',
//   3: 'АО "%s"',
//   4: 'ЗАО "%s"'
// };

// function generateReceipts(count: number): Receipt[] {
//   const receipts: Receipt[] = [];
  
//   for (let i = 0; i < count; i++) {
//     const productType = +faker.helpers.arrayElement(Object.keys(PRODUCT_CATEGORIES));
//     const productName = faker.helpers.arrayElement(PRODUCT_CATEGORIES[productType]);
//     const price = faker.number.float({ 
//       min: 30, 
//       max: 5000, 
//       fractionDigits: 2 // Заменили precision на fractionDigits
//     });
//     const quantity = faker.number.float({ 
//       min: 1, 
//       max: 10, 
//       fractionDigits: 1 // Заменили precision на fractionDigits
//     });
    
//     const receipt: Receipt = {
//       Id: faker.number.int({ min: 10000, max: 999999 }),
//       User: faker.number.int({ min: 1, max: 20000 }),
//       CreatedAt: faker.date.between({
//         from: '2024-01-01',
//         to: '2025-12-31'
//       }).toISOString(),
//       Items: [{
//         Name: productName,
//         Price: price,
//         Quantity: quantity,
//         Sum: parseFloat((price * quantity).toFixed(2)),
//         InvoiceType: faker.helpers.arrayElement([1, 3, null]),
//         InvoiceSum: null,
//         ProductType: productType,
//         PaymentType: faker.helpers.arrayElement([1, 2]),
//         "Organization form": generateOrganizationName()
//       }]
//     };
    
//     receipts.push(receipt);
//   }
  
//   return receipts;
// }

// function generateOrganizationName(): string {
//   const orgType = +faker.helpers.arrayElement(Object.keys(ORGANIZATION_TYPES));
//   const name = faker.company.name();
//   return ORGANIZATION_TYPES[orgType].replace('%s', name.split(' ')[0]);
// }

// // Генерация 100 чеков
// const receipts = generateReceipts(100);
// writeFileSync('./src/data/receipts.json', JSON.stringify(receipts, null, 2));

// console.log('Файл с чеками успешно сгенерирован!');


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

const receipts = generateReceipts(10);
writeFileSync('./src/data/receipts.json', JSON.stringify(receipts, null, 2), 'utf8');
console.log('Сгенерировано 10 чеков (включая гарантированные примеры) и сохранено в receipts.json');