# Mokophones POS System - Complete Guide

## Overview
A comprehensive Point of Sale (POS) system built with Next.js, Shadcn/UI, and Tailwind CSS for managing small-to-medium businesses.

## Key Features

### 1. **Sales & Transactions Management**
- Track all sales with quantity, unit price, and total amounts
- Calculate profit/loss per transaction automatically
- Support multiple payment methods (Cash, Card, Mobile Money, Check, Bank Transfer)
- Track transaction status (Completed, Pending, Cancelled)
- **Data Location**: `data.salesTransactions`

### 2. **Inventory Management**
- Real-time stock tracking
- Automatic low-stock alerts (minimum stock threshold)
- Out-of-stock notifications
- Cost tracking per product for profit calculation
- Supplier information per product
- **Data Location**: `data.products`

### 3. **Customer Management**
- Maintain customer profiles
- Track total purchases per customer
- Calculate average order value
- Track purchase history and frequency
- **Data Location**: `data.clients`

### 4. **Debtor Management**
- Track customer debts and outstanding balances
- Monitor days overdue
- Record payment status
- **Data Location**: `data.debtors`

### 5. **Supplier Management**
- Maintain supplier database
- Track amounts owed to suppliers
- Monitor payment status and payment terms
- Track products supplied
- **Data Location**: `data.suppliers`

### 6. **Expense Tracking**
- Categorize expenses (Rent, Utilities, Salaries, Marketing, Maintenance, Transportation, etc.)
- Track payment methods and status
- Maintain expense references
- **Data Location**: `data.expenses`

### 7. **Invoice Management**
- Generate invoices for sales
- Track invoice status (Paid, Pending, Overdue)
- Set due dates
- Record payment dates
- **Data Location**: `data.invoices`

### 8. **Business Metrics & Reports**
- Daily sales summaries
- Monthly performance metrics
- Revenue and profit tracking
- Loss analysis
- Inventory health metrics
- Customer metrics
- Supplier metrics
- **Data Location**: `data.businessMetrics`

## Data Structure

### Products
```javascript
{
  id: number,
  name: string,
  category: string,
  price: number,           // Selling price
  cost: number,            // Cost/COGS
  stock: number,
  minStock: number,        // Low stock threshold
  status: "In Stock" | "Low Stock" | "Out of Stock",
  supplier: string,
  lastRestocked: date
}
```

### Sales Transactions
```javascript
{
  id: number,
  orderId: number,
  customer: string,
  product: string,
  quantity: number,
  unitPrice: number,
  unitCost: number,
  totalPrice: number,
  totalCost: number,
  profit: number,          // Calculated: totalPrice - totalCost
  paymentMethod: string,
  date: date,
  status: "Completed" | "Pending" | "Cancelled"
}
```

### Suppliers
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  country: string,
  address: string,
  contact: string,
  paymentTerms: string,    // e.g., "Net 30"
  totalOwed: number,
  paymentStatus: "Paid" | "Pending",
  lastOrder: date,
  products: string[]
}
```

### Expenses
```javascript
{
  id: number,
  date: date,
  category: string,
  description: string,
  amount: number,
  paymentMethod: string,
  status: "Paid" | "Pending",
  reference: string
}
```

### Business Metrics
- **Daily Metrics**: Sales, profit, costs, expenses per day
- **Monthly Metrics**: Revenue, profit, costs, expenses per month
- **Inventory Metrics**: Total value, low stock count, inventory turnover
- **Customer Metrics**: Total customers, active customers, average order value
- **Supplier Metrics**: Total owed, payment status breakdown

## Pages & Components

### Overview (Home)
- Dashboard with key metrics
- Sales trends chart
- Category distribution
- Order status breakdown
- Product performance

### Products
- Product inventory list
- Stock status indicators
- Low stock alerts
- Product filtering and search

### Clients
- Customer database
- Purchase history
- Contact information
- Customer segmentation

### Debtors
- Overdue tracking
- Outstanding balances
- Payment status
- Recovery tracking

### Suppliers
- Supplier information
- Payment obligations
- Payment terms
- Order history

### Sales
- Transaction history
- Profit/loss per transaction
- Payment method breakdown
- Sales status tracking

### Invoices
- Invoice generation
- Payment tracking
- Due date management
- Invoice status

### Expenses
- Expense categorization
- Budget tracking
- Payment status
- Expense reporting

### Reports
- Daily/Weekly/Monthly sales reports
- Profit & loss statements
- Inventory status reports
- Customer reports
- Supplier reports
- Business growth metrics

## Key Calculations

### Profit Per Transaction
```
Profit = (Quantity × Unit Price) - (Quantity × Unit Cost)
       = Total Price - Total Cost
```

### Total Profit
```
Total Profit = Sum of all transaction profits - Total Expenses
```

### Inventory Turnover
```
Inventory Turnover = Cost of Goods Sold / Average Inventory Value
```

### Average Order Value
```
AOV = Total Revenue / Number of Transactions
```

### Cash Flow
```
Cash Flow = Revenue - Costs - Expenses
```

## Simulated Transactions

The system includes sample data for testing:
- 8 completed/pending sales transactions
- 6 customer profiles
- 6 products with varying stock levels
- 5 suppliers with different payment statuses
- 6 expense entries
- 6 invoices
- Daily and monthly metrics

## Best Practices

1. **Regular Updates**: Keep inventory data current
2. **Payment Tracking**: Record all payments promptly
3. **Expense Recording**: Log expenses immediately
4. **Stock Alerts**: Set appropriate minimum stock levels
5. **Customer Follow-up**: Use debtor data to manage collections
6. **Supplier Management**: Monitor payment terms and obligations
7. **Regular Reports**: Review daily/weekly/monthly metrics

## Integration Points

The system is ready for:
- Real-time database integration (Supabase, Firebase, etc.)
- Payment gateway integration
- Email notifications for low stock/overdue invoices
- SMS alerts for critical events
- Export functionality (PDF, Excel)
- Accounting software integration

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS
- **Data**: JSON (sample data in `/public/data/data.json`)
- **Animations**: Framer Motion
- **State**: React Hooks
- **Icons**: Lucide React

## File Structure

```
app/
├── layout.js
├── page.js (Overview)
├── products/
├── clients/
├── debtors/
├── suppliers/
├── sales/
├── invoices/
├── expenses/
├── reports/
├── components/
├── providers/
│   └── ThemeProvider.jsx
└── public/
    └── data/
        └── data.json
```

## Theme Support

The system includes dark/light theme switching using the ThemeProvider context, with full Tailwind CSS dark mode support.

## Future Enhancements

- Multi-user authentication
- Role-based access control
- Real-time notifications
- Advanced analytics
- Custom report builder
- Mobile app
- API endpoints for mobile POS terminals
- Barcode scanning
- Receipt printing
- Tax calculations
