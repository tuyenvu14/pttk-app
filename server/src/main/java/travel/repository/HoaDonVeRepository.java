package travel.repository;

import travel.model.HoaDonVe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaDonVeRepository extends JpaRepository<HoaDonVe, Integer> {
//    List<HoaDonVe> find(int startDate, int endDate);
}
