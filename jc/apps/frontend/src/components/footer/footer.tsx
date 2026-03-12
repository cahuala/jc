'use client'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div id="footer" className="app-footer">
      &copy; {currentYear} Primoris, Todos Direitos Reservados
    </div>
  );
}