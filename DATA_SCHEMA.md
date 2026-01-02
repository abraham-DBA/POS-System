# Mokophones POS - Complete Data Schema Reference

## Data Structure Overview

```
data.json
├── sideBarItems[]           - Navigation menu
├── sales[]                  - Monthly sales trend data
├── categories[]             - Category distribution
├── orderStatus[]            - Order status breakdown
├── productPerformance[]     - Product metrics
├── products[]               - Inventory items
├── clients[]                - Customer database
├── debtors[]                - Outstanding debts
├── suppliers[]              - Supplier management
├── salesTransactions[]      - Transaction history
├── invoices[]               - Billing records
├── expenses[]               - Business expenses
└── businessMetrics
    ├── dailyMetrics[]
    ├── monthlyMetrics[]
    ├── inventoryMetrics{}
    ├── customerMetrics{}
    └── supplierMetrics{}
```

## Detailed Schema

### 1. Sidebar Navigation Items

```typescript
interface SideBarItem {
  name: string;           // Display name
  href: string;           // Route path
  item: string;           // Icon name (Lucide React)
}
```

**Example**:
```json
{
  "name": "Products",
  "href": "/products",
  "item": "ShoppingBag"
}
```

**All Items**:
- Home, Products, Clients, Debtors, Suppliers, Invoices
- Sales, Expenses, Reports, Settings

---

### 2. Products (Inventory)

```typescript
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;              // Selling price
  cost: number;               // Cost of goods sold
  stock: number;              // Current quantity
  minStock: number;           // Low stock threshold
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;              // Image URL
  supplier: string;           // Supplier name
  lastRestocked: string;      // ISO date (YYYY-MM-DD)
}
```

**Example**:
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "category": "Smartphones",
  "price": 999,
  "cost": 650,
  "stock": 150,
  "minStock": 20,
  "status": "In Stock",
  "image": "https://...",
  "supplier": "Apple Inc",
  "lastRestocked": "2024-12-15"
}
```

**Profit Calculation**: `(price - cost) per unit`

---

### 3. Sales Transactions

```typescript
interface SalesTransaction {
  id: number;
  orderId: number;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;          // Price per item
  unitCost: number;           // Cost per item
  totalPrice: number;         // quantity × unitPrice
  totalCost: number;          // quantity × unitCost
  profit: number;             // totalPrice - totalCost
  paymentMethod: string;      // Cash | Card | Mobile Money | Check | Bank Transfer
  date: string;               // ISO date
  status: "Completed" | "Pending" | "Cancelled";
}
```

**Example**:
```json
{
  "id": 1,
  "orderId": 1001,
  "customer": "John Kabuye",
  "product": "iPhone 15 Pro",
  "quantity": 1,
  "unitPrice": 999,
  "unitCost": 650,
  "totalPrice": 999,
  "totalCost": 650,
  "profit": 349,
  "paymentMethod": "Cash",
  "date": "2024-12-20",
  "status": "Completed"
}
```

**Calculations**:
- `totalPrice = quantity × unitPrice`
- `totalCost = quantity × unitCost`
- `profit = totalPrice - totalCost`
- `profitMargin = (profit / totalPrice) × 100`

---

### 4. Customers (Clients)

```typescript
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  avatar: string;             // Avatar image URL
  totalPurchases: number;     // Total amount spent
  purchaseCount: number;      // Number of purchases
  lastPurchase: string;       // ISO date
}
```

**Example**:
```json
{
  "id": 1,
  "name": "John Kabuye",
  "email": "john.kabuye@email.com",
  "phone": "+256 701 234567",
  "country": "Uganda",
  "avatar": "https://...",
  "totalPurchases": 5997,
  "purchaseCount": 6,
  "lastPurchase": "2024-12-24"
}
```

**Derived Metrics**:
- `averageOrderValue = totalPurchases / purchaseCount`
- `daysInactive = today - lastPurchase`
- `isRepeatCustomer = purchaseCount > 1`

---

### 5. Debtors (Outstanding Balances)

```typescript
interface Debtor {
  id: number;
  name: string;
  email: string;
  phone: string;
  amount: number;             // Outstanding balance
  daysOverdue: number;
  status: "Overdue" | "Pending";
  avatar: string;             // Avatar image URL
}
```

**Example**:
```json
{
  "id": 1,
  "name": "John Kabuye",
  "email": "john.kabuye@email.com",
  "phone": "+256 701 234567",
  "amount": 4500,
  "daysOverdue": 45,
  "status": "Overdue",
  "avatar": "https://..."
}
```

**Status Logic**:
- `Overdue`: `daysOverdue > 0`
- `Pending`: Waiting for payment

---

### 6. Suppliers

```typescript
interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  contact: string;            // Contact person name
  paymentTerms: string;       // "Net 30" | "Net 45" | "Net 60"
  totalOwed: number;          // Amount owed
  paymentStatus: "Paid" | "Pending";
  lastOrder: string;          // ISO date
  products: string[];         // Products supplied
}
```

**Example**:
```json
{
  "id": 1,
  "name": "Apple Inc",
  "email": "supplier@apple.com",
  "phone": "+1 408 996 1010",
  "country": "USA",
  "address": "1 Apple Park Way, Cupertino",
  "contact": "John Smith",
  "paymentTerms": "Net 30",
  "totalOwed": 45000,
  "paymentStatus": "Pending",
  "lastOrder": "2024-12-15",
  "products": ["iPhone 15 Pro", "iPhone 14"]
}
```

**Payment Logic**:
- `dueDate = lastOrder + paymentTerms (in days)`
- `isOverdue = today > dueDate`

---

### 7. Invoices

```typescript
interface Invoice {
  id: number;
  invoiceNumber: number;
  customer: string;
  customerId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;        // quantity × unitPrice
  date: string;               // ISO date (issued)
  dueDate: string;            // ISO date (payment due)
  status: "Paid" | "Pending" | "Overdue";
  paymentDate: string | null; // ISO date when paid
}
```

**Example**:
```json
{
  "id": 1,
  "invoiceNumber": 2401,
  "customer": "John Kabuye",
  "customerId": 1,
  "description": "iPhone 15 Pro Purchase",
  "quantity": 1,
  "unitPrice": 999,
  "totalAmount": 999,
  "date": "2024-12-20",
  "dueDate": "2024-12-27",
  "status": "Paid",
  "paymentDate": "2024-12-21"
}
```

**Status Logic**:
- `Paid`: `paymentDate !== null`
- `Overdue`: `today > dueDate && paymentDate === null`
- `Pending`: `dueDate >= today && paymentDate === null`

**Calculations**:
- `daysOverdue = max(0, today - dueDate)`
- `daysUntilDue = max(0, dueDate - today)`

---

### 8. Expenses

```typescript
interface Expense {
  id: number;
  date: string;               // ISO date
  category: string;           // Rent | Utilities | Salaries | Marketing | Maintenance | Transportation
  description: string;
  amount: number;
  paymentMethod: string;      // Cash | Card | Bank Transfer | Check
  status: "Paid" | "Pending";
  reference: string;          // Reference code (EXP-001, etc.)
}
```

**Example**:
```json
{
  "id": 1,
  "date": "2024-12-20",
  "category": "Rent",
  "description": "Monthly store rent",
  "amount": 2000,
  "paymentMethod": "Bank Transfer",
  "status": "Paid",
  "reference": "EXP-001"
}
```

**Expense Categories**:
- Rent - Building/store rent
- Utilities - Electricity, water, internet
- Salaries - Employee salaries
- Marketing - Advertising and promotion
- Maintenance - Equipment and facility maintenance
- Transportation - Delivery and logistics

---

### 9. Business Metrics

#### 9.1 Daily Metrics

```typescript
interface DailyMetric {
  date: string;               // ISO date
  totalSales: number;         // Total revenue
  totalProfit: number;        // Total profit
  totalCost: number;          // Total COGS
  transactions: number;       // Transaction count
  totalExpenses: number;      // Total expenses that day
}
```

**Example**:
```json
{
  "date": "2024-12-20",
  "totalSales": 999,
  "totalProfit": 349,
  "totalCost": 650,
  "transactions": 1,
  "totalExpenses": 500
}
```

**Calculation**:
- `netProfit = totalProfit - totalExpenses`
- `profitMargin = (netProfit / totalSales) × 100`

---

#### 9.2 Monthly Metrics

```typescript
interface MonthlyMetric {
  month: string;              // Month name or number
  revenue: number;            // Total sales
  profit: number;             // Gross profit (before expenses)
  costs: number;              // Total COGS
  expenses: number;           // Total operating expenses
  transactions: number;       // Number of transactions
}
```

**Example**:
```json
{
  "month": "January",
  "revenue": 45000,
  "profit": 15000,
  "costs": 30000,
  "expenses": 5000,
  "transactions": 120
}
```

**Calculations**:
- `netProfit = profit - expenses`
- `costOfGoodsRatio = (costs / revenue) × 100`
- `profitMargin = (profit / revenue) × 100`
- `netProfitMargin = (netProfit / revenue) × 100`

---

#### 9.3 Inventory Metrics

```typescript
interface InventoryMetrics {
  totalValue: number;         // Total inventory value
  lowStockItems: number;      // Count of items below minStock
  outOfStockItems: number;    // Count of items with 0 stock
  totalItems: number;         // Total product count
  turnoverRate: number;       // Inventory turnover ratio
}
```

**Example**:
```json
{
  "totalValue": 189350,
  "lowStockItems": 1,
  "outOfStockItems": 1,
  "totalItems": 6,
  "turnoverRate": 2.8
}
```

**Calculations**:
- `totalValue = sum(stock × price) for all products`
- `stockHealthPercentage = ((totalItems - lowStockItems - outOfStockItems) / totalItems) × 100`
- `reorderNeeded = products where stock <= minStock`

---

#### 9.4 Customer Metrics

```typescript
interface CustomerMetrics {
  totalCustomers: number;     // Total customer count
  activeCustomers: number;    // Customers with purchases in period
  totalReceivedAmount: number; // Total revenue collected
  averageOrderValue: number;  // Average order amount
  repeatCustomers: number;    // Customers with 2+ purchases
}
```

**Example**:
```json
{
  "totalCustomers": 6,
  "activeCustomers": 6,
  "totalReceivedAmount": 8490,
  "averageOrderValue": 1415,
  "repeatCustomers": 2
}
```

**Calculations**:
- `customerRetention = (repeatCustomers / totalCustomers) × 100`
- `newCustomers = totalCustomers - repeatCustomers`
- `customerLifetimeValue = totalReceivedAmount / totalCustomers`
- `activeRate = (activeCustomers / totalCustomers) × 100`

---

#### 9.5 Supplier Metrics

```typescript
interface SupplierMetrics {
  totalSuppliers: number;     // Total supplier count
  totalOwed: number;          // Total amount owed to all suppliers
  paidSuppliers: number;      // Suppliers with Paid status
  pendingPayments: number;    // Suppliers with Pending status
  averagePaymentTerms: string; // Average payment term (e.g., "Net 41")
}
```

**Example**:
```json
{
  "totalSuppliers": 5,
  "totalOwed": 99000,
  "paidSuppliers": 2,
  "pendingPayments": 3,
  "averagePaymentTerms": "Net 41"
}
```

**Calculations**:
- `paymentCompletionRate = (paidSuppliers / totalSuppliers) × 100`
- `pendingRate = (pendingPayments / totalSuppliers) × 100`
- `cashNeeded = sum of totalOwed for suppliers with Pending status`

---

## Data Relationships

```
Product
├── Referenced in: SalesTransaction, Invoice
├── Links to: Supplier (via supplier name)
└── Used for: Inventory tracking, profit calculation

Customer
├── Referenced in: SalesTransaction, Invoice, Debtor
├── Links to: SalesTransaction (via customer name)
└── Used for: Revenue tracking, relationship management

SalesTransaction
├── Links to: Product, Customer
├── Generates: Profit, Revenue metrics
└── Used for: Sales analysis, reporting

Supplier
├── Referenced in: Product, SalesTransaction (via invoice)
├── Tracks: Amounts owed, payment terms
└── Used for: Supplier management, cash flow planning

Invoice
├── Links to: Customer, Product
├── Tracks: Payment status, due dates
└── Used for: Billing, cash flow, accounts receivable

Expense
├── No direct links
├── Affects: Net profit calculation
└── Used for: Financial reporting, budgeting

BusinessMetrics
├── Aggregates: SalesTransaction, Expense, Product, Customer, Supplier
├── Calculated from: All transactions and records
└── Used for: KPI tracking, business intelligence
```

## Calculation Formulas Reference

### Revenue
```
Revenue = Sum of all totalPrice from SalesTransaction where status = "Completed"
```

### Cost of Goods Sold (COGS)
```
COGS = Sum of all totalCost from SalesTransaction where status = "Completed"
```

### Gross Profit
```
Gross Profit = Revenue - COGS
```

### Net Profit
```
Net Profit = Gross Profit - Total Expenses
```

### Profit Margin
```
Profit Margin (%) = (Gross Profit / Revenue) × 100
```

### Inventory Value
```
Inventory Value = Sum of (stock × cost) for all products
```

### Outstanding Receivables
```
Outstanding = Sum of amount from Debtor where status = "Pending" or "Overdue"
```

### Outstanding Payables
```
Payables = Sum of totalOwed from Supplier where paymentStatus = "Pending"
```

### Cash Flow
```
Cash Flow = Revenue Received - Expenses Paid - Payables
```

### Inventory Turnover
```
Turnover = COGS / Average Inventory Value
```

### Average Order Value
```
AOV = Total Revenue / Number of Transactions
```

### Customer Acquisition Cost
```
CAC = Marketing Expenses / New Customers Acquired
```

---

## Export/Import Format Notes

### JSON Structure
- All dates in ISO format (YYYY-MM-DD or ISO 8601)
- All currency values in decimal (no currency symbols)
- Arrays are zero-indexed
- IDs are unique within each collection

### Database Normalization
When migrating to a database, consider:
- Products table with supplier_id foreign key
- Customers table
- SalesTransactions table with product_id, customer_id foreign keys
- Suppliers table
- Invoices table with customer_id foreign key
- Expenses table with category_id foreign key
- Debtors could be derived from unpaid invoices

---

**Last Updated**: January 2, 2026
**Status**: Complete Schema Reference
**Version**: 1.0.0
