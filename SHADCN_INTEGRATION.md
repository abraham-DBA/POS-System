# Shadcn/UI Integration Guide for Mokophones POS

## Overview

This project uses **Shadcn/UI** components as the foundation for the user interface. Shadcn/UI is a collection of beautifully designed, accessible, and composable React components built on top of Radix UI and Tailwind CSS.

## Currently Used Components

### 1. Table Component
**Location**: `/components/ui/table.jsx`

**Used in**: All data list pages (Products, Clients, Debtors, Suppliers, Sales, Invoices, Expenses)

**Structure**:
```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Features**:
- Semantic HTML table structure
- Responsive design support
- Dark mode support
- Accessible with proper ARIA attributes
- Sortable columns (can be extended)
- Pagination ready (can be added)

**Styling**:
- Headers: Dark background with white text
- Rows: Hover effects for better UX
- Responsive: Hide columns on smaller screens using Tailwind's hidden/block classes

## Recommended Shadcn/UI Components to Add

### 1. Dialog / Modal
**Purpose**: Confirm deletions, edit items, create new entries

**Example Implementation**:
```jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function EditProductDialog({ product }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Edit</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {/* Form here */}
      </DialogContent>
    </Dialog>
  )
}
```

**When to use**:
- Edit product/customer information
- Confirm delete operations
- Create new records

### 2. Button Component
**Purpose**: Consistent button styling across the app

**Current Implementation**: Regular HTML buttons with Tailwind classes

**Recommended Upgrade**:
```jsx
import { Button } from "@/components/ui/button"

<Button variant="default">Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Actions</Button>
```

**Benefits**:
- Consistent styling
- Built-in loading states
- Accessibility features
- Multiple variants

### 3. Input Component
**Purpose**: Form inputs with consistent styling

**Current Implementation**: HTML input with Tailwind classes

**Recommended Upgrade**:
```jsx
import { Input } from "@/components/ui/input"

<Input 
  placeholder="Search products..." 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**Benefits**:
- Consistent styling
- Dark mode support
- Validation states
- Label and error message support

### 4. Select Component
**Purpose**: Dropdown selects (payment method, expense category, etc.)

**Example**:
```jsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select value={category} onValueChange={setCategory}>
  <SelectTrigger>
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="rent">Rent</SelectItem>
    <SelectItem value="utilities">Utilities</SelectItem>
    <SelectItem value="salaries">Salaries</SelectItem>
  </SelectContent>
</Select>
```

**Use cases in POS**:
- Filter by expense category
- Filter by payment method
- Filter by product category
- Filter by status

### 5. Badge Component
**Purpose**: Status indicators (replace current span status badges)

**Current Implementation**:
```jsx
<span className={`px-2 py-1 rounded text-xs ${
  status === 'Paid' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
}`}>
  {status}
</span>
```

**Recommended Upgrade**:
```jsx
import { Badge } from "@/components/ui/badge"

<Badge variant={status === 'Paid' ? 'default' : 'secondary'}>
  {status}
</Badge>
```

**Status badge mapping**:
```javascript
const getBadgeVariant = (status) => {
  switch(status) {
    case 'Paid':
    case 'Completed':
    case 'In Stock':
      return 'default' // Green
    case 'Pending':
    case 'Low Stock':
      return 'secondary' // Yellow
    case 'Overdue':
    case 'Out of Stock':
      return 'destructive' // Red
    default:
      return 'outline'
  }
}
```

### 6. Card Component
**Purpose**: Wrap sections (stat cards, metric cards)

**Current Implementation**: Div with Tailwind classes

**Recommended Upgrade**:
```jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Total Sales</CardTitle>
  </CardHeader>
  <CardContent>
    $12,345
  </CardContent>
</Card>
```

**Use cases**:
- Stat cards on dashboard
- Metric display on reports page
- Grouped information sections

### 7. Tabs Component
**Purpose**: Switch between different views/reports

**Example**:
```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="daily">
  <TabsList>
    <TabsTrigger value="daily">Daily</TabsTrigger>
    <TabsTrigger value="weekly">Weekly</TabsTrigger>
    <TabsTrigger value="monthly">Monthly</TabsTrigger>
  </TabsList>
  <TabsContent value="daily">
    {/* Daily report */}
  </TabsContent>
  <TabsContent value="monthly">
    {/* Monthly report */}
  </TabsContent>
</Tabs>
```

**Use cases**:
- Reports page (Daily/Weekly/Monthly views)
- Product details (Overview/Sales/Reviews tabs)
- Customer details (Profile/Orders/Payments tabs)

### 8. Tooltip Component
**Purpose**: Help text on hover

**Example**:
```jsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>?</button>
    </TooltipTrigger>
    <TooltipContent>
      Minimum stock level for alerts
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Use cases**:
- Explain confusing metrics
- Help with inventory settings
- Explain profit calculations

### 9. Alert Component
**Purpose**: Important messages (low stock, overdue payments)

**Example**:
```jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Stock Alert</AlertTitle>
  <AlertDescription>
    OnePlus 12 is running low. Current stock: 5 units
  </AlertDescription>
</Alert>
```

**Use cases**:
- Low stock warnings
- Overdue payment alerts
- System notifications

### 10. Pagination Component
**Purpose**: Navigate through large datasets

**Example**:
```jsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" onClick={() => setPage(page - 1)}>
        Previous
      </PaginationLink>
    </PaginationItem>
    {Array.from({length: totalPages}).map((_, i) => (
      <PaginationItem key={i}>
        <PaginationLink 
          href="#" 
          isActive={page === i + 1}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
  </PaginationContent>
</Pagination>
```

**Use cases**:
- Navigate large product lists
- Navigate transaction history
- Paginate reports

## Installation Guide

### Install Shadcn/UI Components

```bash
# Install a component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add pagination

# Or install multiple at once
npx shadcn-ui@latest add button input select badge card dialog tabs tooltip alert pagination
```

## Color Scheme for POS

### Success States (Green)
- Completed transactions
- Paid invoices
- In stock products
- Active customers

### Warning States (Yellow)
- Pending transactions
- Pending payments
- Low stock
- Pending invoices

### Danger States (Red)
- Cancelled transactions
- Overdue payments
- Out of stock
- High debt amounts

### Neutral States (Gray/Blue)
- Default data
- Secondary actions
- Informational text

## Dark Mode Integration

All Shadcn/UI components automatically support dark mode through Tailwind's dark mode classes.

**Pattern used**:
```jsx
const isDark = theme === 'dark';

// For background
className={`${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}

// For text
className={`${isDark ? 'text-white' : 'text-gray-900'}`}

// For borders
className={`${isDark ? 'border-gray-700' : 'border-gray-300'}`}
```

**Shadcn/UI approach** (cleaner):
```jsx
// Automatically respects dark mode in tailwind.config.js
className='bg-background text-foreground border-border'
```

## Best Practices

### 1. Use Composition Over Props
```jsx
// ❌ Too many props
<Modal isOpen={isOpen} onClose={handleClose} title="Edit" {...props} />

// ✅ Composition
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### 2. Consistent Spacing
Shadcn/UI uses standard spacing scale:
- `px-2 py-1` for small
- `px-4 py-2` for medium
- `px-6 py-3` for large

### 3. Keyboard Navigation
All Shadcn/UI components support:
- Tab navigation
- Enter/Space to activate
- Escape to close modals
- Arrow keys for menus

### 4. Accessibility
Components include:
- ARIA labels
- Role attributes
- Keyboard shortcuts
- Screen reader support

### 5. Responsive Design
Use Shadcn/UI with Tailwind responsive prefixes:
```jsx
// Hide on mobile, show on medium+ screens
<TableHead className="hidden md:table-cell">
  Desktop Only
</TableHead>
```

## Migration Path

### Phase 1: Low Priority
- Add Button component throughout app
- Add Input component for search boxes
- Add Badge for status displays

### Phase 2: Medium Priority
- Add Dialog for create/edit operations
- Add Select for filtering
- Add Card for metric displays

### Phase 3: High Priority
- Add Tabs for reports page
- Add Pagination for large lists
- Add Alert for warnings

### Phase 4: Polish
- Add Tooltip for help text
- Add form validation components
- Add loading skeletons

## Theming

### Current Approach
Manual color management with Tailwind classes

### Shadcn/UI Approach
Uses CSS variables in `globals.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
  }
}
```

This allows easy theme customization without changing component code.

## Performance Considerations

### Tree Shaking
Shadcn/UI components are copied to your codebase, allowing:
- Unused code elimination
- Custom modifications
- Smaller bundle size

### Code Splitting
Each component is separate, enabling:
- Lazy loading
- On-demand imports
- Better caching

## Resources

- [Shadcn/UI Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [React Component Composition](https://react.dev/learn/passing-props-to-a-component)

---

**Updated**: January 2, 2026
**Status**: Ready for implementation
