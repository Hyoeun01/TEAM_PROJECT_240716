package com.example.demo.notice.controller;

import com.example.demo.notice.service.HtmlToJsonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HtmlToJsonController {

    @Autowired
    private HtmlToJsonService htmlToJsonService;

    @PostMapping("/convert")
    public Map<String, Object> convertHtmlToJson(@RequestBody String html) {
        return htmlToJsonService.convertHtmlToJson(html);
    }
}
