package com.example.demo.notice.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
        json.put("attributes", element.attributes().dataset());
        Elements children = element.children();
        if (!children.isEmpty()) {
            Map<String, Object>[] childrenJson = new HashMap[children.size()];
            for (int i = 0; i < children.size(); i++) {
                childrenJson[i] = elementToJson(children.get(i));
            }
            json.put("children", childrenJson);
        } else {
            json.put("text", element.ownText());
        }
        return json;
    }
}

