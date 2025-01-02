export async function fetchMembers() {
    try {
        const response = await fetch('/members');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching members:', error);
        throw error; // Propagate the error
    }
}