CREATE TABLE "temple_external_apis" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"temple_name" text NOT NULL,
	"slug" text NOT NULL,
	"base_url" text NOT NULL,
	"stats_endpoint" text DEFAULT '/api/dashboard/stats' NOT NULL,
	"auth_type" text DEFAULT 'bearer' NOT NULL,
	"auth_token" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_sync_at" timestamp,
	"last_sync_status" text,
	"last_sync_error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "temple_external_apis_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "temple_external_stats" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"api_id" varchar NOT NULL,
	"date" timestamp NOT NULL,
	"total_users" integer DEFAULT 0,
	"paid_users" integer DEFAULT 0,
	"active_users" integer DEFAULT 0,
	"total_sessions" integer DEFAULT 0,
	"page_views" integer DEFAULT 0,
	"ai_conversations" integer DEFAULT 0,
	"monthly_revenue" integer DEFAULT 0,
	"total_donations" integer DEFAULT 0,
	"storage_used_mb" integer DEFAULT 0,
	"raw_response" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "temple_onboarding" ALTER COLUMN "space_type" SET DEFAULT 'dedicated';--> statement-breakpoint
ALTER TABLE "temple_external_apis" ADD CONSTRAINT "temple_external_apis_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "temple_external_stats" ADD CONSTRAINT "temple_external_stats_api_id_temple_external_apis_id_fk" FOREIGN KEY ("api_id") REFERENCES "public"."temple_external_apis"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "temple_external_apis_userId_idx" ON "temple_external_apis" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "temple_external_apis_slug_idx" ON "temple_external_apis" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "temple_external_stats_apiId_idx" ON "temple_external_stats" USING btree ("api_id");--> statement-breakpoint
CREATE INDEX "temple_external_stats_date_idx" ON "temple_external_stats" USING btree ("date");