export const useApi = (endpoint: string, opts: any = {}) => {
    const base = useRuntimeConfig().public.apiUrl; // https://api2.pardad-group.com/api/v1
    return $fetch(`${base}${endpoint}`, opts)
}