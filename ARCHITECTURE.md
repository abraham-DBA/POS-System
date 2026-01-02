# Mokophones POS System - Architecture & Development Guide

## System Overview

The Mokophones POS System is a modern, scalable Point of Sale application built with Next.js and Shadcn/UI components. It's designed to help small-to-medium businesses manage sales, inventory, customers, suppliers, and generate comprehensive business reports.

## Architecture

### Technology Stack
- **Framework**: Next.js 16+ (App Router with Server Components)
- **UI Components**: Shadcn/UI (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS with dark/light mode support
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context API (ThemeProvider)
- **Data Source**: JSON (easily replaceable with API/Database)

### Project Structure

```
mokophones/
├── app/
│   ├── layout.js              # Root layout with ThemeProvider
│   ├── page.js                # Overview/Dashboard
│   ├── providers/
│   │   └── ThemeProvider.jsx  # Dark/Light theme context
│   ├── components/
│   │   ├── Header.jsx         # App header with theme toggle
│   │   └── SideBar.jsx        # Navigation sidebar
│   ├── overview/              # Dashboard section
│   │   ├── page.jsx
│   │   └── _components/
│   ├── products/              # Products management
│   │   ├── page.jsx
│   │   └── _components/
│   │       └── ProductsTable.jsx
│   ├── clients/               # Customer management
│   │   ├── page.jsx
│   │   └── _components/
│   │       └── ClientsTable.jsx
│   ├── debtors/               # Debtor tracking
│   │   ├── page.jsx
│   │   └── _components/
│   │       └── DebtorsTable.jsx
│   ├── suppliers/             # Supplier management
│   │   ├── page.jsx
│   │   └── _components/
│   │       └── SuppliersTable.jsx
│   ├── sales/                 # Sales transactions
│   │   ├── page.jsx
│   │   └── _components/
│   │       └── SalesTable.jsx
│   ├── invoices/              # Invoice management
│   │   ├── page.jsx
│   │   └── _components/
│   │       └── InvoicesTable.jsx
│   ├── expenses/              # Expense tracking
│   │   ├── page.jsx
│   │   └── _components/
│   │       └── ExpensesTable.jsx
│   └── reports/               # Business reports
│       └── page.jsx
├── components/
│   └── ui/                    # Shadcn/UI components
│       └── table.jsx
├── lib/
│   └── utils.js               # Utility functions
├── public/
│   └── data/
│       └── data.json          # Mock/sample data
└── package.json
```

## Core Modules

### 1. Data Models

#### Product
```javascript
{
  id: number,
  name: string,
  category: string,
  price: number,              // Selling price
  cost: number,               // Cost of Goods Sold
  stock: number,              // Current quantity
  minStock: number,           // Low stock threshold
  status: string,             // "In Stock" | "Low Stock" | "Out of Stock"
  image: string,              // Product image URL
  supplier: string,           // Supplier name
  lastRestocked: string       // ISO date
}
```

#### Sales Transaction
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
  profit: number,             // Calculated: (quantity × unitPrice) - (quantity × unitCost)
  paymentMethod: string,      // "Cash" | "Card" | "Mobile Money" | "Check" | "Bank Transfer"
  date: string,               // ISO date
  status: string              // "Completed" | "Pending" | "Cancelled"
}
```

#### Customer
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  country: string,
  avatar: string,             // Avatar image URL
  totalPurchases: number,     // Total amount spent
  purchaseCount: number,      // Total number of purchases
  lastPurchase: string        // ISO date of last purchase
}
```

#### Supplier
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  country: string,
  address: string,
  contact: string,            // Contact person name
  paymentTerms: string,       // e.g., "Net 30", "Net 45"
  totalOwed: number,
  paymentStatus: string,      // "Paid" | "Pending"
  lastOrder: string,          // ISO date
  products: string[]          // Product names supplied
}
```

#### Expense
```javascript
{
  id: number,
  date: string,               // ISO date
  category: string,           // "Rent" | "Utilities" | "Salaries" | "Marketing" | etc.
  description: string,
  amount: number,
  paymentMethod: string,
  status: string,             // "Paid" | "Pending"
  reference: string           // Expense reference code
}
```

#### Invoice
```javascript
{
  id: number,
  invoiceNumber: number,
  customer: string,
  customerId: number,
  description: string,
  quantity: number,
  unitPrice: number,
  totalAmount: number,
  date: string,               // ISO date
  dueDate: string,            // ISO date
  status: string,             // "Paid" | "Pending" | "Overdue"
  paymentDate: string | null  // ISO date when paid
}
```

### 2. Business Logic

#### Profit Calculation
```javascript
function calculateProfit(transaction) {
  return (transaction.quantity * transaction.unitPrice) - 
         (transaction.quantity * transaction.unitCost);
}
```

#### Stock Status
```javascript
function getStockStatus(product) {
  if (product.stock === 0) return "Out of Stock";
  if (product.stock <= product.minStock) return "Low Stock";
  return "In Stock";
}
```

#### Inventory Turnover
```javascript
function calculateTurnover(totalCostOfGoodsSold, averageInventoryValue) {
  return totalCostOfGoodsSold / averageInventoryValue;
}
```

#### Cash Flow
```javascript
function calculateCashFlow(revenue, costs, expenses) {
  return revenue - costs - expenses;
}
```

### 3. Component Structure

#### Page Components
All page components follow this pattern:
- 'use client' directive (Client Component)
- Framer Motion animations for stat cards
- StartsCard components showing key metrics
- Corresponding Table component for data display

**Example**: `app/products/page.jsx`
```javascript
'use client'

export default function ProductsPage() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
          {/* Stat cards */}
        </motion.div>
        <ProductsTable />
      </main>
    </div>
  )
}
```

#### Table Components
All table components share the same pattern:
- Data fetching from `/public/data/data.json`
- Search/filter functionality
- Dark/light theme support using `useTheme()` hook
- Responsive design (hidden columns on smaller screens)
- Edit/Delete action buttons
- Motion animations

**Example**: `app/products/_components/ProductsTable.jsx`
```javascript
"use client"

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    fetch('data/data.json')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }, [])

  // Render table with search, filters, and actions
}
```

### 4. Styling Patterns

#### Theme Colors
- **Dark Mode**: Background `#1e1e1e`, Cards `#1e1e1e`, Header `#2a2a2a`
- **Light Mode**: Background `white`, Cards `white`, Header `gray-100`

#### Responsive Breakpoints
- Small screens (mobile): Single column, minimal columns in tables
- Medium screens (tablet): Two columns, more table data
- Large screens (desktop): Four columns, all table columns visible

#### Status Badge Colors
- **Green**: Positive/Completed (In Stock, Completed, Paid)
- **Yellow**: Pending/Warning (Pending, Low Stock)
- **Red**: Negative/Error (Out of Stock, Cancelled, Overdue)

## Data Flow

### 1. Initialization
1. App loads with `layout.js`
2. ThemeProvider wraps the entire app
3. User navigates to a page (e.g., `/products`)

### 2. Page Load
1. Page component mounts (e.g., `ProductsPage`)
2. Stat cards display hardcoded metrics
3. Table component fetches data from `data.json`
4. Data is filtered based on search term
5. Table renders with data

### 3. User Interaction
1. User types in search box
2. Search term state updates
3. Filter function re-evaluates
4. Table re-renders with filtered results
5. Theme toggle updates `ThemeProvider` context
6. All components re-render with new theme

## Integration Points

### Backend Integration
Replace the `fetch('data/data.json')` with API calls:

```javascript
// Instead of:
fetch('data/data.json')

// Use API:
const response = await fetch('/api/products');
const data = await response.json();
```

### Database Integration
Recommended services:
- **Supabase**: PostgreSQL with built-in auth
- **Firebase**: Real-time database
- **MongoDB**: NoSQL database
- **Prisma**: ORM for any SQL database

### Authentication
Add authentication middleware:
```javascript
// app/middleware.ts
export function middleware(request) {
  const token = request.cookies.get('authToken');
  if (!token) redirect('/login');
}
```

### Payment Integration
For payment methods:
- Stripe for cards
- Pesapal for mobile money (East Africa)
- PayPal for international

### Real-time Updates
Use Socket.io or Supabase Realtime for live stock updates

## Extension Guide

### Adding a New Page

1. **Create folder**: `app/newfeature/`
2. **Create page**: `app/newfeature/page.jsx`
3. **Create table component**: `app/newfeature/_components/NewFeatureTable.jsx`
4. **Add data to `data.json`**: New array for the feature
5. **Update sidebar**: Add item to `sideBarItems` in `data.json`

### Adding a New Metric

1. Edit `data.json` to include new metric
2. Update the page's stat card component
3. Fetch the new metric in the table component
4. Display in appropriate card

### Adding a New Table Column

1. Add the column definition in `TableHeader`
2. Add the data cell in `TableBody`
3. Update responsive classes (hidden on smaller screens)
4. Adjust search/filter logic if needed

## Performance Optimization

### Current Optimizations
- Image optimization with Next.js `<Image>`
- Code splitting with dynamic imports
- Tail CSS PurgeCSS for smaller bundles
- React memo for table rows (can be added)

### Future Optimizations
```javascript
// Add memoization
const ProductRow = React.memo(({ product }) => (...))

// Add pagination for large datasets
const [page, setPage] = useState(1);
const itemsPerPage = 10;

// Add virtualization for long lists
import { FixedSizeList } from 'react-window';
```

## Testing Strategy

### Unit Tests
```javascript
// Test profit calculation
test('calculateProfit returns correct value', () => {
  const profit = (quantity * unitPrice) - (quantity * unitCost);
  expect(profit).toBe(expectedValue);
});
```

### Component Tests
```javascript
// Test component renders
test('ProductsTable renders with data', () => {
  render(<ProductsTable />);
  expect(screen.getByText('Products')).toBeInTheDocument();
});
```

### E2E Tests
- Test complete user flow: navigate → search → filter → edit

## Security Considerations

### Current State
- Client-side filtering only (safe for demo)
- No authentication
- Data in public folder

### For Production
1. **Server-side validation**: All inputs validated on server
2. **Authentication**: Implement user login/roles
3. **Authorization**: Check permissions before operations
4. **Encryption**: Encrypt sensitive data (prices, customer data)
5. **API Security**: Rate limiting, CORS, CSRF protection
6. **Data Privacy**: GDPR compliance for customer data

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
```
DATABASE_URL=your_database_url
API_KEY=your_api_key
NEXT_PUBLIC_API_URL=your_api_url
```

## Maintenance & Monitoring

### Regular Tasks
- Backup database weekly
- Monitor inventory levels
- Review profit/loss reports
- Update supplier information
- Archive old transactions

### Monitoring
- Transaction success rate
- Page load times
- Error logging
- User activity tracking

## Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Shadcn/UI: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

### Community
- Discord: Shadcn/UI Discord
- GitHub: Discussions & Issues
- Stack Overflow: Tag questions

## Roadmap

### Phase 1 (Current)
- ✅ Core POS functionality
- ✅ Inventory tracking
- ✅ Sales management
- ✅ Basic reports

### Phase 2
- Multi-user support
- Advanced reports
- Email notifications
- API endpoints

### Phase 3
- Mobile app
- Barcode scanning
- Receipt printing
- Tax calculations

### Phase 4
- AI-powered analytics
- Predictive inventory
- Supplier optimization
- Customer segmentation

---

**Last Updated**: January 2, 2026
**Version**: 1.0.0
**License**: MIT
