# Mokophones POS System - Quick Start Guide

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone/Open the project**
```bash
cd mokophones
```

2. **Install dependencies** (if not already done)
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Project Navigation

### Dashboard (Overview)
- **URL**: `/`
- **Purpose**: Business metrics and KPIs at a glance
- **Features**: Sales trends, category distribution, product performance
- **Sample Data**: 12 months of sales data

### Products
- **URL**: `/products`
- **Purpose**: Manage inventory and stock levels
- **Features**: 
  - Search products by name or category
  - Real-time stock status
  - Low stock alerts
  - Cost and profit tracking
- **Sample Data**: 6 products with varying stock levels

### Clients
- **URL**: `/clients`
- **Purpose**: Customer database and relationship management
- **Features**:
  - Customer profiles
  - Purchase history
  - Contact information
  - Customer segmentation
- **Sample Data**: 6 customers with purchase data

### Debtors
- **URL**: `/debtors`
- **Purpose**: Track customer debts and outstanding balances
- **Features**:
  - Overdue tracking
  - Outstanding amount monitoring
  - Days overdue calculation
  - Payment status tracking
- **Sample Data**: 6 debtors with varying outstanding amounts

### Suppliers
- **URL**: `/suppliers`
- **Purpose**: Supplier management and payment tracking
- **Features**:
  - Supplier information
  - Amount owed tracking
  - Payment terms
  - Order history
- **Sample Data**: 5 suppliers with payment status

### Sales
- **URL**: `/sales`
- **Purpose**: Transaction history and sales analysis
- **Features**:
  - Transaction details
  - Profit/loss per transaction
  - Payment method tracking
  - Status management
- **Sample Data**: 8 completed/pending sales

### Invoices
- **URL**: `/invoices`
- **Purpose**: Invoice management and payment tracking
- **Features**:
  - Invoice generation
  - Due date tracking
  - Payment status
  - Payment date recording
- **Sample Data**: 6 invoices

### Expenses
- **URL**: `/expenses`
- **Purpose**: Business expense tracking and categorization
- **Features**:
  - Expense categorization
  - Payment method tracking
  - Status management (Paid/Pending)
  - Reference tracking
- **Sample Data**: 6 expense entries

### Reports
- **URL**: `/reports`
- **Purpose**: Comprehensive business reports and analytics
- **Features**:
  - Daily sales report
  - Monthly performance metrics
  - Inventory health status
  - Customer analytics
  - Supplier payment status
  - Cash flow summary
- **Sample Data**: Generated from all modules

## Key Features Explained

### 1. Real-time Search
All list pages include search functionality:
- Type in the search box to filter results
- Search works on multiple fields (name, email, phone, etc.)
- Results update instantly

### 2. Responsive Design
- Works on desktop, tablet, and mobile
- Table columns hide on smaller screens for better readability
- Navigation adjusts for touch devices

### 3. Theme Support
- Toggle between dark and light modes
- Click the moon/sun icon in the header
- Preference persists across sessions
- All components support both themes

### 4. Profit Calculation
Every sales transaction shows:
- Unit Price (selling price)
- Unit Cost (cost of goods)
- Total Profit = (Quantity × Unit Price) - (Quantity × Unit Cost)

### 5. Inventory Management
Products show:
- Current stock level
- Minimum stock threshold
- Automatic status ("In Stock", "Low Stock", "Out of Stock")
- Last restock date
- Supplier information

## Understanding the Data Structure

### Where is the data stored?
All sample data is in: `/public/data/data.json`

### Data includes:
1. **Sidebar Items** - Navigation menu
2. **Products** - Inventory
3. **Clients** - Customers
4. **Debtors** - Outstanding balances
5. **Suppliers** - Supplier info
6. **Sales Transactions** - All sales
7. **Invoices** - Billing
8. **Expenses** - Business costs
9. **Business Metrics** - Analytics data

### Sample Data Overview
- 6 Products (3 in stock, 1 low stock, 1 out of stock)
- 6 Customers with purchase history
- 6 Outstanding debts
- 5 Suppliers with payment obligations
- 8 Sales transactions
- 6 Invoices (3 paid, 3 pending)
- 6 Expense entries
- Daily and monthly metrics

## Common Tasks

### Search for a Product
1. Go to `/products`
2. Type product name in the search box
3. Results update instantly

### View Customer Purchases
1. Go to `/clients`
2. See total purchases and purchase count for each customer
3. Click customer name to see more details (in future versions)

### Track Overdue Payments
1. Go to `/debtors`
2. See "Days Overdue" column
3. Filter by status (Overdue/Pending)

### Monitor Stock Levels
1. Go to `/products`
2. Look for "Low Stock" or "Out of Stock" status
3. Reorder from suppliers to avoid stockouts

### View Business Performance
1. Go to `/reports`
2. See daily sales and profit
3. View monthly trends
4. Check inventory health
5. Review customer metrics

### Track Supplier Payments
1. Go to `/suppliers`
2. See "Amount Owed" for each supplier
3. Track payment status
4. View payment terms

### Record Expenses
1. Go to `/expenses`
2. See all expenses categorized
3. View payment status
4. Filter by category or date

## Key Metrics Explained

### Profit
```
Profit = (Quantity Sold × Selling Price) - (Quantity Sold × Cost)
```

### Inventory Turnover
```
How fast inventory is sold and replaced
Higher = Better inventory management
```

### Average Order Value
```
Total Revenue ÷ Number of Orders
Indicates average customer purchase size
```

### Cash Flow
```
Revenue - Costs - Expenses
Positive = Business is profitable
```

### Days Overdue
```
Time since payment was due
Used to track late payments
```

## Customization

### Change Business Name
Edit: App header components or add to data.json

### Add New Products
1. Open `/public/data/data.json`
2. Add to products array with:
   - id, name, category, price, cost, stock, minStock, status, image, supplier, lastRestocked

### Add New Customers
1. Open `/public/data/data.json`
2. Add to clients array with:
   - id, name, email, phone, country, avatar, totalPurchases, purchaseCount, lastPurchase

### Add New Expense Category
Edit `/public/data/data.json` expenses and add new category in page component

### Change Colors
Edit Tailwind classes in components (e.g., `bg-[#1e1e1e]` for dark background)

## Troubleshooting

### Page not loading
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`
- Restart dev server: `npm run dev`

### Data not showing
- Check that `/public/data/data.json` exists
- Verify data.json syntax (valid JSON)
- Check browser network tab for failed requests

### Theme not changing
- Refresh the page
- Clear browser cache
- Check localStorage for 'theme' key

### Responsive design not working
- Clear browser cache
- Use browser dev tools to test different screen sizes
- Check Tailwind config includes all breakpoints

## Next Steps

### To extend the system:

1. **Add Database**: Replace fetch('data.json') with API calls
2. **Add Authentication**: Implement user login
3. **Add Notifications**: Email/SMS alerts for low stock
4. **Add More Reports**: Custom report builder
5. **Mobile App**: Convert to React Native

### Recommended readings:
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)

## Support

For issues or questions:
1. Check the logs in browser console
2. Review the ARCHITECTURE.md document
3. Check data.json structure
4. Verify all dependencies are installed

---

**Happy POS-ing!** 🚀

Last updated: January 2, 2026
