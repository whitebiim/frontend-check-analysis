
const mockReceipts = [
    {
      id: 1,
      user: 123,
      createdAt: new Date(2024, 0, 15),
      items: [
        { name: "Product A", price: 10, quantity: 2, sum: 20, productType: 1, paymentType: 1 },
        { name: "Product B", price: 20, quantity: 1, sum: 20, productType: 2, paymentType: 2 },
      ],
    },
    {
      id: 2,
      user: 456,
      createdAt: new Date(2024, 0, 20),
      items: [
        { name: "Product C", price: 15, quantity: 3, sum: 45, productType: 1, paymentType: 1 },
        { name: "Product D", price: 25, quantity: 1, sum: 25, productType: 3, paymentType: 3 },
      ],
    },
  ];
  
  export default mockReceipts;