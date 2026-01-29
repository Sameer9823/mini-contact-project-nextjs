import ContactList from '@/components/contact-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Contacts() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Contacts
          </h1>

          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0"
            >
              ← Go to Home
            </Button>
          </Link>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <ContactList />
        </div>

      </div>
    </main>
  )
}

export default Contacts
