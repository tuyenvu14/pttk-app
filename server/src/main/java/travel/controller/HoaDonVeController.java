package travel.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import travel.model.*;
import travel.repository.DiemDenRepository;
import travel.repository.HoaDonVeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("users")
@Api(tags = "users")
@RequiredArgsConstructor
public class HoaDonVeController {
    @Autowired
    private HoaDonVeRepository hoaDonVeRepository;
    @Autowired
    private DiemDenRepository diemDenRepository;

    @GetMapping("/ticks")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<HoaDonVe> getDiemDen() {
        return hoaDonVeRepository.findAll();
    }

    @GetMapping("/statistic")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public PageStatistic getStatistic(int startDate, int endDate, int size, int page ) {
        List<DiemDen> diemDenList = diemDenRepository.findAll();
        List<Statistic> result =  new ArrayList<>();
        List<HoaDonVe> list = hoaDonVeRepository.findAll();
        List<HoaDonVe> hoaDonVeList = new ArrayList<>();
        for(int i=0; i <list.size(); i++) {
            if(list.get(i).getTourSchedule().getStartDate() >= startDate && list.get(i).getTourSchedule().getStartDate() <= endDate) {
                hoaDonVeList.add(list.get(i));
            }
        }
        for(int i = 0; i < diemDenList.size(); i++) {
            Statistic statistic = new Statistic();
            statistic.setId(diemDenList.get(i).getId());
            statistic.setName(diemDenList.get(i).getName());
            int countTour = 0;
            int countCustomer = 0;
            int countMonney = 0;
            for(int j = 0; j < hoaDonVeList.size(); j++ ) {
                if(hoaDonVeList.get(j).getTourSchedule().getTour().getDiemDen().getName().equals(diemDenList.get(i).getName())) {
                    countTour++;
                    countCustomer += hoaDonVeList.get(j).getQuantityVisitor();
                    countMonney += hoaDonVeList.get(j).getQuantityVisitor() * hoaDonVeList.get(j).getTourSchedule().getPrice();
                }
            }
            statistic.setTotalTour(countTour);
            statistic.setTotalCustomer(countCustomer);
            statistic.setTotalMonney(countMonney);
            result.add(statistic);
        }
        Collections.sort(result, new Comparator<Statistic>() {
            @Override
            public int compare(Statistic o1, Statistic o2) {
                return o1.getTotalMonney() > o2.getTotalMonney() ? -1 : 1;
            }
        });
        PageStatistic result1 = new PageStatistic();
        List<Statistic> statistics = new ArrayList<>();

        for (int i = size * page; i < size*page+size; i++) {
            if(i < result.size()) {
                statistics.add(result.get(i));
            }
        }
        result1.setStatistic(statistics);
        result1.setTotal(result.size());


            return result1;
    }

    @GetMapping("/detail")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public PageDetail getStatisticDetail(int startDate, int endDate, String locationName, int size, int page) {
        List<Detail> result =  new ArrayList<>();
        List<HoaDonVe> list = hoaDonVeRepository.findAll();
        List<HoaDonVe> hoaDonVeList = new ArrayList<>();
        for(int i=0; i <list.size(); i++) {
            if(list.get(i).getTourSchedule().getStartDate() >= startDate && list.get(i).getTourSchedule().getStartDate() <= endDate) {
                hoaDonVeList.add(list.get(i));
            }
        }

        for(int i = 0; i < hoaDonVeList.size(); i++) {
            if(hoaDonVeList.get(i).getTourSchedule().getTour().getDiemDen().getName().equals(locationName)) {
                Detail detail = new Detail();
                detail.setId(hoaDonVeList.get(i).getId());
                detail.setNameCustomer(hoaDonVeList.get(i).getKhachHang().getName());
                detail.setStartDate(hoaDonVeList.get(i).getTourSchedule().getStartDate());
                detail.setTotalCustomer(hoaDonVeList.get(i).getQuantityVisitor());
                detail.setNameTour(hoaDonVeList.get(i).getTourSchedule().getTour().getName());
                detail.setTotalMonney(hoaDonVeList.get(i).getQuantityVisitor() * hoaDonVeList.get(i).getTourSchedule().getPrice());
                result.add(detail);
            }
        }
        PageDetail result1 = new PageDetail();
        List<Detail> details = new ArrayList<>();
        for (int i = size * page; i < size*page+size; i++) {
            if(i < result.size()) {
                details.add(result.get(i));
            }
        }

        result1.setDetail(details);
        result1.setTotal(result.size());

        return result1;
    }
}
