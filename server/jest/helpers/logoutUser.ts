export default function logoutUser(server: any) {
    server.delete('/auth/logout');
}