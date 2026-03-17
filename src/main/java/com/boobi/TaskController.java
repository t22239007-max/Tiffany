package com.boobi;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @GetMapping("/list")
    public List<String> getTasks() {
        return List.of("PPT生成", "爬虫", "文案生成", "数据爬取");
    }
}
