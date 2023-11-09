function endsWithKeep(input: string): boolean {
  const regex = /\|keep$/;
  return regex.test(input);
}
function endsWithRemove(input: string): boolean {
  const regex = /\|remove$/;
  return regex.test(input);
}

export { endsWithKeep, endsWithRemove };
