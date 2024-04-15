Rails.application.routes.draw do
  get 'pdf/generate_pdf'
  # post '/generate_pdf', to: 'pdf#generate_pdf'
  # get '/projects/:project_id/generate_pdf', to: 'pdf#generate_pdf', as: 'generate_pdf'
  # post '/projects/:project_id/email_update/send_audit_history_email', to: 'email_update#send_audit_history_email'
  
  # get '/pdf/generate_pdf_for_project/:project_id', to: 'pdf#generate_pdf_for_project', as: 'generate_pdf_for_project'
  
  # resources :posts
  namespace :api do
    namespace :v1 do
      resources :users
      resources :posts
      resources :projects
      resources :clients
      resources :overviews
      resources :audit_histories
      resources :version_histories
      resources :projects do
        resources :overviews, only: [:index, :create, :update, :destroy]
        resources :audit_histories, only: [:index, :create, :update, :destroy]
        resources :version_histories, only: [:index, :create, :update, :destroy]
        resources :stakeholders, only: [:index, :create, :update, :destroy]
        resources :risk_profilings, only: [:index, :create, :update, :destroy]
        resources :sprint_details, only: [:index, :create, :update, :destroy]
        resources :phases, only: [:index, :create, :update, :destroy]
        resources :operational_escalations, only: [:index, :create, :update, :destroy]
        resources :financial_escalations, only: [:index, :create, :update, :destroy]
        resources :technical_escalations, only: [:index, :create, :update, :destroy]
        resources :approved_teams, only: [:index, :create, :update, :destroy]
        resources :resources, only: [:index, :create, :update, :destroy]
        resources :client_feedbacks, only: [:index, :create, :update, :destroy]
        resources :project_updates, only: [:index, :create, :update, :destroy]
        resources :moms_of_client_meetings, only: [:index, :create, :update, :destroy]
        post '/email_update/send_audit_history_email', to: 'email_update#send_audit_history_email'
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

# rails generate scaffold VersionHistory version_no:string version_type:string change:text reason:text created_by:string revision_date:date approve_date:date approved_by:string project:references

# rails generate scaffold RiskProfiling risk_type:string description:text severity:string impact:string remedial_steps:text status:string closure_date:date project:references

# rails generate scaffold SprintDetail sprint:string start_date:date end_date:date status:string comments:text project:references



