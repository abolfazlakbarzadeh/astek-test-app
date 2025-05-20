const environments = {
    production: {
        apiUrl: 'http://localhost:8000',
    },
    development: {
        apiUrl: 'http://localhost:3001/api/v1',
    }
}

export const env = environments[import.meta.env.DEV ? 'development' : 'production'];