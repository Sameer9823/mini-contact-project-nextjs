import { getAllContacts } from '@/actions'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Mail, User } from 'lucide-react'
import ContactStatusButtons from './Status'

export default async function ContactList() {
  const contacts = await getAllContacts()

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Contact Messages
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Empty State */}
      {contacts.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No contact messages found
          </CardContent>
        </Card>
      )}

      {/* Contact Cards */}
      {contacts.map((contact) => (
        <Card
          key={contact._id}
          className="transition hover:shadow-md"
        >
          <CardContent className="p-6 space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-base font-semibold">
                    {contact.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
             <div className="flex flex-col items-end gap-2">
  <Badge
    variant={
      contact.status === "resolved"
        ? "default"
        : contact.status === "in-progress"
        ? "secondary"
        : "outline"
    }
  >
    {contact.status}
  </Badge>

  <ContactStatusButtons
    contactId={contact._id.toString()}
    currentStatus={contact.status}
  />
</div>

            </div>

            {/* Message */}
            <div className="rounded-lg bg-muted p-4 text-sm leading-relaxed">
              {contact.message || "No message provided"}
            </div>

            {/* Date */}
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">
                {new Date(contact.createdAt).toLocaleDateString()}
              </span>
            </div>

          </CardContent>
        </Card>
      ))}

    </div>
  )
}
