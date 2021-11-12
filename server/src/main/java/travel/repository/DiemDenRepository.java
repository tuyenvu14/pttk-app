package travel.repository;

import travel.model.DiemDen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiemDenRepository extends JpaRepository<DiemDen, Integer> {
    List<DiemDen> findByName(String name);
}
