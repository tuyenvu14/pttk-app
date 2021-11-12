package travel.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Detail {
    private int id;
    private String nameCustomer;
    private int startDate;
    private int totalCustomer;
    private String nameTour;
    private int totalMonney;
}
