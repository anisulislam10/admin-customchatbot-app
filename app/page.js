'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For redirection
import DashboardPage from './admin/dashboard/page';
import Login from './admin/login/page';
import { useSession } from 'next-auth/react';
export default function Home() {
 
const {data: session, status} = useSession();


  // Render Admin Dashboard if authenticated
  if (session && status === 'authenticated' ) {
    return <DashboardPage />;
  }
  else{
    return <Login />;
  }


}