export function Preloader() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          gap: "20px",
        }}
      >
        <img
          src="/src/components/custom-preloader/preloader.gif"
          alt="Загрузка"
        />
        <p>ищем выбранную валюту...</p>
      </div>
    </>
  );
}
