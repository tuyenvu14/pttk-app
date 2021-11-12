package travel.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tour")
@Builder
public class Tour implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "diem_den_id", nullable = false, referencedColumnName = "id")
    private DiemDen diemDen;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "diem_xuat_phat_id", nullable = false, referencedColumnName = "id")
    private DiemXuatPhat diemXuatPhat;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "lich_trinh_id", nullable = false, referencedColumnName = "id")
    private LichTrinh lichTrinh;
}