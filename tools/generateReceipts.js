"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ru_1 = require("@faker-js/faker/locale/ru");
var fs_1 = require("fs");
function generateReceipt(isService, isValid) {
    if (isValid === void 0) { isValid = true; }
    var itemCount = ru_1.faker.number.int({ min: 1, max: 5 });
    var items = [];
    var totalSum = 0;
    var invoiceType = isValid
        ? (isService ? 2 : 1)
        : null;
    for (var i = 0; i < itemCount; i++) {
        var price = ru_1.faker.number.float({
            min: 10,
            max: 1000,
            fractionDigits: 2
        });
        var quantity = ru_1.faker.number.int({ min: 1, max: 10 });
        var sum = parseFloat((price * quantity).toFixed(2));
        var item = {
            Name: isService
                ? ru_1.faker.commerce.productName() + " (услуга)"
                : ru_1.faker.commerce.productName(),
            Price: price,
            Quantity: quantity,
            Sum: sum,
            InvoiceType: invoiceType,
            InvoiceSum: sum,
            ProductType: ru_1.faker.number.int({ min: 1, max: 10 }),
            PaymentType: ru_1.faker.number.int({ min: 1, max: 3 }),
            "Organization form": ru_1.faker.company.name()
        };
        items.push(item);
        totalSum += sum;
    }
    return {
        Items: items,
        Id: ru_1.faker.number.int({ min: 10000, max: 99999 }),
        User: ru_1.faker.number.int({ min: 1000, max: 9999 }),
        CreatedAt: ru_1.faker.date.recent({ days: 30 }).toISOString(),
        TotalSum: parseFloat(totalSum.toFixed(2))
    };
}
function generateReceipts(count) {
    var receipts = [];
    for (var i = 0; i < count; i++) {
        var isService = ru_1.faker.datatype.boolean();
        var isValid = ru_1.faker.datatype.boolean();
        receipts.push(generateReceipt(isService, isValid));
        // Добавляем гарантированно валидные чеки с товарами и услугами
        if (i === 0) {
            receipts.push(generateReceipt(false, true)); // товары
            receipts.push(generateReceipt(true, true)); // услуги
        }
        // Добавляем гарантированно невалидный чек
        if (i === 1) {
            receipts.push(generateReceipt(ru_1.faker.datatype.boolean(), false));
        }
    }
    return receipts;
}
var receipts = generateReceipts(100);
(0, fs_1.writeFileSync)('./src/data/receipts.json', JSON.stringify(receipts, null, 2), 'utf8');
console.log('Сгенерировано 100 чеков (включая гарантированные примеры) и сохранено в receipts.json');
// npx ts-node generateReceipts.ts
