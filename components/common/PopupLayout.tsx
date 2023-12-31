type Props = {
  className?: string;
  children?: React.ReactNode;
};

function PopupLayout({ className, children }: Props) {
  return (
    <div
      className={`fixed top-0 left-0 z-[900] w-screen h-screen max-h-screen ${className}`}
    >
      {children}
    </div>
  );
}

export default PopupLayout;
