from supabase_client import supabase

def setup_storage():
    try:
        print("Checking storage buckets...")
        buckets = supabase.storage.list_buckets()
        bucket_names = [b.name for b in buckets]
        print(f"Existing buckets: {bucket_names}")
        
        if "documents" not in bucket_names:
            print("Creating 'documents' bucket...")
            # Note: Creating buckets via client might fail if the key doesn't have permissions.
            # Usually requires service_role key or dashboard action.
            try:
                supabase.storage.create_bucket("documents", options={"public": True})
                print("'documents' bucket created successfully.")
            except Exception as e:
                print(f"Failed to create bucket: {e}")
                print("Please create a public bucket named 'documents' in your Supabase dashboard.")
        else:
            print("'documents' bucket already exists.")
            
    except Exception as e:
        print(f"Error connecting to Supabase Storage: {e}")

if __name__ == "__main__":
    setup_storage()
