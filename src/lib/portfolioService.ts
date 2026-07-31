export const fetchProjects = async () => {
  try {
    const res = await fetch('/api/admin/projects', { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export const fetchCertificates = async () => {
  try {
    const res = await fetch('/api/admin/certificates', { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export const fetchTechStacks = async () => {
  try {
    const res = await fetch('/api/admin/tech-stack', { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}
