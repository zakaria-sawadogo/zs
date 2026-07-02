export function withBasePath(path: string) {
  if (!path || path === "#") return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return path;
  if (basePath && path.startsWith(`${basePath}/`)) return path;

  return `${basePath}${path}`;
}

export function isAdminEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_ADMIN !== "false";
}
