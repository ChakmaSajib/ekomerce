// This is dynamic routing
// first, find the route url from the param
import { useRouter } from 'next/router'
import React from 'react'

export default function ProductScreen() {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div>

        </div>
    )
}
