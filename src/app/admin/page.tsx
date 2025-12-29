import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { portfolioProjects, services, storeProducts } from "@/lib/data";
import { Briefcase, Package, Sparkles, Users } from "lucide-react";

// This is mock data. In a real app, you'd fetch this from your database.
const recentSubmissions = [
    { id: 1, name: "John Doe", email: "john@example.com", message: "Interested in web development services.", submittedAt: "2024-07-28" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Question about the 'Minima' template.", submittedAt: "2024-07-27" },
    { id: 3, name: "Peter Jones", email: "peter@example.com", message: "Let's talk about a new branding project.", submittedAt: "2024-07-26" },
];


export default function AdminPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Welcome back! Here's an overview of your site.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Total projects showcased
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Store Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Total products in store
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Offered</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
            <p className="text-xs text-muted-foreground">
              Total services listed
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Contact Submissions</h2>
         <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                            <TableCell>{submission.submittedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
      </div>
    </div>
  );
}
