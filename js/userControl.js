if (isConnected()) {
    const role = getRoleInToken(getToken());
    redirectPageByRole(role);
}