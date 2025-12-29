'use client';

import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { ADMIN_UID } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { services } from '@/lib/data';
import { Briefcase, Package, Sparkles, Loader2 } from 'lucide-react';
import { collection } from 'firebase/firestore';
import { PortfolioProject, WebsiteTemplate } from '@/types';
import { AdminPortfolioTable } from '@/components/admin/admin-portfolio-table';
import { AdminStoreTable } from '@/components/admin/admin-store-table';

const recentSubmissions = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Interested in web development services.',
    submittedAt: '2024-07-28',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: "Question about the 'Minima' template.",
    submittedAt: '2024-07-27',
  },
  {
    id: 3,
    name: 'Peter Jones',
    email: 'peter@example.com',
    message: "Let's talk about a new branding project.",
    submittedAt: '2024-07-26',
  },
];

function AdminDashboard() {
  const firestore = useFirestore();
  const portfolioProjectsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'portfolioProjects') : null),
    [firestore]
  );
  const { data: portfolioProjects, isLoading: isLoadingProjects } =
    useCollection<PortfolioProject>(portfolioProjectsCollection);

  const storeProductsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'websiteTemplates') : null),
    [firestore]
  );
  const { data: storeProducts, isLoading: isLoadingProducts } =
    useCollection<WebsiteTemplate>(storeProductsCollection);


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
            {isLoadingProjects ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {portfolioProjects?.length ?? 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Total projects showcased
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Store Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isLoadingProducts ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {storeProducts?.length ?? 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Total products in store
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Services Offered
            </CardTitle>
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

      <div className="space-y-12">
        <AdminPortfolioTable projects={portfolioProjects || []} isLoading={isLoadingProjects} />
        <AdminStoreTable products={storeProducts || []} isLoading={isLoadingProducts} />

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Recent Contact Submissions
          </h2>
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
                {recentSubmissions.map(submission => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.name}
                    </TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {submission.message}
                    </TableCell>
                    <TableCell>{submission.submittedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && (!user || user.uid !== ADMIN_UID)) {
      router.replace('/login?redirect=/admin');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user || user.uid !== ADMIN_UID) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  return <AdminDashboard />;
}

    