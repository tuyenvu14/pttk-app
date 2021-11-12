package travel.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import travel.model.DiemDen;
import travel.repository.DiemDenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("users")
@Api(tags = "users")
@RequiredArgsConstructor
public class DiemDenController {
    @Autowired
    private DiemDenRepository diemDenRepository;

    @GetMapping("/location")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<DiemDen> getDiemDen() {
        return diemDenRepository.findAll();
    }
}
