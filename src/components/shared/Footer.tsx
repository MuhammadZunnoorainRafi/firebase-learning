function Footer() {
  const date = new Date().toLocaleDateString();
  return (
    <div className="font-mono tracking-widest font-bold text-center py-2">
      {date}
    </div>
  );
}

export default Footer;
