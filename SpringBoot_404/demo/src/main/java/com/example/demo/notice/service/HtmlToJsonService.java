package com.example.demo.notice.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HtmlToJsonService {

    public Map<String, Object> convertHtmlToJson(String html) {
        Document doc = Jsoup.parse(html);
        Element body = doc.body();
        return elementToJson(body);
    }

    private Map<String, Object> elementToJson(Element element) {
        Map<String, Object> json = new HashMap<>();
        json.put("tag", element.tagName());

        // Attributes 추출
        Map<String, String> attributes = new HashMap<>();
        element.attributes().forEach(attr -> attributes.put(attr.getKey(), attr.getValue()));
        json.put("attributes", attributes);

        // Children 추출
        Elements children = element.children();
        if (!children.isEmpty()) {
            List<Map<String, Object>> childrenJson = new ArrayList<>();
            for (Element child : children) {
                childrenJson.add(elementToJson(child));
            }
            json.put("children", childrenJson);
        } else {
            json.put("text", element.ownText());
        }

        return json;
    }
}
