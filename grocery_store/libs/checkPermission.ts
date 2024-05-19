import permissions from '../config/permission.json';

// Check if the user has the required permission for a route
export const checkPermission = (permission: string, roleName: string) => {
    try {
        const userPermissions = permissions.roles.find((role) => role.name === roleName);
        console.log(userPermissions);
        console.log(permission);
        if (userPermissions?.permissions.includes(permission)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }

};