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
@Table(name = "hoa_don")
@Builder
public class HoaDonVe implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false )
    private int id;

    @Column(name = "date")
    private int date;

    @Column(name = "quantity_visitor")
    private int quantityVisitor;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "tour_schedule_id", nullable = false, referencedColumnName = "id")
    private Tour_Schedule tourSchedule;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "loai_hoa_don_id", nullable = false, referencedColumnName = "id")
    private LoaiHoaDon loaiHoaDon;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "khach_hang_id", nullable = false, referencedColumnName = "id")
    private KhachHang khachHang;
}
