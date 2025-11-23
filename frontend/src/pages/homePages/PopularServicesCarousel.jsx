import Carousel from "../../services/Carousel";
import popularServices from "../../services/popularServices";

export default function PopularServicesCarousel() {
  return (
    <section style={{ margin: "50px 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Tintas Populares
      </h2>

      <Carousel items={popularServices} />
    </section>
  );
}
