import { t } from "https://raw.githubusercontent.com/zhmushan/deno_test/master/index.ts";
import { context } from "context.ts";
import { assertEqual } from "https://deno.land/x/testing/mod.ts";

function injectContext(r = {}) {
  return context(r as any);
}

t("context string", () => {
  let c = injectContext();
  c.string("{foo: 'bar'}");
  assertEqual(c.response.status, 200);
  assertEqual(c.response.body, new TextEncoder().encode("{foo: 'bar'}"));
  assertEqual(c.response.headers.get("Content-Type"), "text/plain");
});

t("context json", () => {
  let c = injectContext();
  c.json({ foo: "bar" });
  assertEqual(c.response.status, 200);
  assertEqual(
    c.response.body,
    new TextEncoder().encode(JSON.stringify({ foo: "bar" }))
  );
  assertEqual(c.response.headers.get("Content-Type"), "application/json");
});

t("context html", () => {
  let c = injectContext();
  c.html("{foo: 'bar'}");
  assertEqual(c.response.status, 200);
  assertEqual(c.response.body, new TextEncoder().encode("{foo: 'bar'}"));
  assertEqual(c.response.headers.get("Content-Type"), "text/html");
});