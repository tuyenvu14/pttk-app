package travel.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Statistic {
    private int id;
    private String name;
    private int totalTour;
    private int totalCustomer;
    private int totalMonney;
}
