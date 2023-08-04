interface Params {
    children: React.ReactNode;
    tipo: string;
}

function Mensaje({ children, tipo }: Params) {
  return (
    <div className={`alerta ${tipo}`}>
      {children}
    </div>
  )
}

export default Mensaje