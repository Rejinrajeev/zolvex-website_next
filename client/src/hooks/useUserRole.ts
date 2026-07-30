'use client'

import { useEffect, useState } from 'react'

export function useUserRole() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch('/api/v1/auth/me')
        const data = await res.json()
        if (res.ok && data.success && data.data?.user) {
          setUserRole(data.data.user.role || null)
        } else {
          setUserRole(null)
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
        setUserRole(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRole()
  }, [])

  return { userRole, loading }
}