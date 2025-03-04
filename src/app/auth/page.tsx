export default async function Auth() {
  return <a href={`${process.env.NEXT_PUBLIC_AUTH_URL}/discord/redirect`} target="_blank">Hello world</a>
}
